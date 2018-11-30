# app/get_orders.py

import requests
from .settings import settings
from celery.exceptions import Ignore
from requests.exceptions import HTTPError
from .celery_app import app
from .db_functions import StoreTransactions, select_latest, UpdateStatus
from woocommerce import API
from celery.utils.log import get_task_logger
from celery import states
import math
import json
import os

logger = get_task_logger(__name__)


def authorize(user):
            
    wcapi = API(
        url=user['url'],
        consumer_key=user['consumer_key'],
        consumer_secret=user['consumer_secret'],
        wp_api=True,
        version="wc/v2"
    )

    if wcapi.get("").status_code == 401:
        raise HTTPError
    return wcapi

def get_one_page(query, page, wcapi, required_fields):
    logger.info("page: {}".format(page))
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
        wcapi = authorize(user)
        
        last_record = select_latest(user['user_id'])

        query = "orders?per_page=100&status=completed&order=asc&{}".format('after=' + last_record if last_record else '')
  
        r = wcapi.get(query)
        pages = int(r.headers['X-WP-TotalPages'] if 'X-WP-TotalPages' in r.headers else 1)
        required_fields = ['order_key', 'customer_id', 'date_created', 'total']
        orders = [{key: order[key] for key in required_fields} for order in r.json() ]

        storage.store(orders)

        if pages > 1: 
            for page in range(2, pages + 1):
                storage.store(get_one_page(query, page, wcapi, required_fields))
        
        status.update('FETCH_SUCCESS')
    except Exception:
        get_orders.update_state(state=states.FAILURE)
        status.update('FETCH_FAILED')
        raise Ignore()

