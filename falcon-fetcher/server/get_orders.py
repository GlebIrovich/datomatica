# app/get_orders.py

import requests
from requests_oauthlib import OAuth1
from .settings import settings
from celery.exceptions import Ignore
from requests.exceptions import HTTPError
from .celery_app import app
from .db_functions import StoreTransactions, select_latest, UpdateStatus
from celery.utils.log import get_task_logger
from celery import states
import math
import json
import os
from woocommerce import API
from urllib.parse import urlencode

logger = get_task_logger(__name__)

class Authorize(object):
    def __init__(self, user):
        self.user = user
        self.base_url = user['url']
        self.params = {
            "consumer_key": user["consumer_key"],
            "consumer_secret": user["consumer_secret"]
        }
        self.required_fields = ['order_key', 'customer_id', 'date_created', 'total']

        self.wcapi = API(
            url=user['url'],
            consumer_key=user["consumer_key"],
            consumer_secret=user["consumer_secret"],
            wp_api=True,
            version="wc/v2"
        )
        
        self.order_params = {
            "per_page": 100,
            "status": "completed",
            "order": "asc",
            "after": select_latest(user['user_id']) or ''
        }
        
    def get_index(self):
        return self.wcapi.get('')
    
    def get_order_page(self, page=''):  
        params = self.order_params
        if page:
            params["page"] = page
        return self.wcapi.get('orders?{}'.format(urlencode(params)))

    def check_connection(self):
        if self.get_index().status_code != 200:
            logger.error('No connection to the server')
            raise HTTPError
        logger.info('Connection with store is established')

def get_one_page(query, page, wcapi, required_fields):
    next_page_query = query+'&page{}'.format(page)
    r = wcapi.get(next_page_query)
    orders = [{key: order[key] for key in required_fields} for order in r.json() ]
    return orders


@app.task(name='GET_ORDERS', bind=True)
def get_orders(self, user):
    """ 
        Async gather data from Woocommerce (one request in 2 sec) and store in in the newly created table
    """
    status = UpdateStatus(user['user_id'])
    try:
        status.update('FETCHING')
        storage = StoreTransactions(user)

        API = Authorize(user)

        API.check_connection()
  
        r = API.get_order_page()
        
        pages = int(r.headers['X-WP-TotalPages'] if 'X-WP-TotalPages' in r.headers else 1)
        orders = [{key: order[key] for key in API.required_fields} for order in r.json() ]

        storage.store(orders)

        if pages > 1: 
            for page in range(2, pages + 1):
                storage.store(API.get_order_page(page))
        
        status.update('FETCH_SUCCESS')
        requests.post(settings['MODEL_URL'] + '/run', data=json.dumps({'user_id': user['user_id']}))

    except Exception as e:
        logger.error('FETCH FAILED:')
        logger.error(e)
        get_orders.update_state(state=states.FAILURE)
        status.update('FETCH_FAILED')
        raise Ignore()

