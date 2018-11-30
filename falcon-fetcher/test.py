# project/test.py

import unittest
from unittest.mock import patch
import os
import json
from falcon import testing
from server import app

from server.celery_app import app as celery_app
from server.get_orders import get_orders, authorize
from requests.exceptions import HTTPError

from server.db_functions import get_user_token, StoreTransactions, select_latest
import time

print(select_latest('08d350d2-9bf9-4d9f-8243-cc85beb283e8'))


class Authorize(unittest.TestCase):
    def setUp(self):
        self.user = {
            'url'  : "http://localhost:8888/masterthesis/",
            'consumer_key': "ck_7aa881cc401d71c3ce7e42d7f7b8619087b842d5",
            'consumer_secret' : "cs_ad6d21476481950c746422d49f5012428ad3a2df",
        }

        # credentials are wrong
        self.wrong_user = {
            'url'  : "http://localhost:8888/masterthesis/",
            'consumer_key': "c_7aa881cc401d71c3ce7e42d7f7b8619087b842d5",
            'consumer_secret' : "c_ad6d21476481950c746422d49f5012428ad3a2df",
            
        }
        self.auth = authorize(self.user)

    
    def test_success_state(self):
        self.assertTrue(self.auth)

    def test_failure_state(self):
        with self.assertRaises(HTTPError):
            authorize(self.wrong_user)

    def test_missing_key_state(self):   
        with self.assertRaises(KeyError):
            authorize({})

class GetOrders(unittest.TestCase):
    def setUp(self):
        self.user = {
            'url'  : "http://localhost:8888/masterthesis/",
            'consumer_key': "ck_7aa881cc401d71c3ce7e42d7f7b8619087b842d5",
            'consumer_secret' : "cs_ad6d21476481950c746422d49f5012428ad3a2df",
            'user_id': '08d350d2-9bf9-4d9f-8243-cc85beb283e8'
        }

        self.wrong_user = {
            'url'  : "http://localhost:8888/masterthesis/",
            'consumer_key': "c_7aa881cc401d71c3ce7e42d7f7b8619087b842d5",
            'consumer_secret' : "c_ad6d21476481950c746422d49f5012428ad3a2df",
            'user_id': '346ebef1-74e5-4ded-8881-fb73e32b4567'
        }
    
    def test_success_state(self):
        t0 = time.time()
        task = get_orders.apply_async(args=[self.user])
        task.get()
        t1 = time.time() - t0
        print('Task was completed in {sec} seconds'.format(sec=t1))

        self.assertEqual(task.state, 'SUCCESS')

    # def test_success_state_no_new_data(self):
    #     task_no_data = get_orders.apply_async(args=[self.user, select_latest('346ebef1-74e5-4ded-8881-fb73e32b4567') ]) 
    #     task_no_data.get()

    #     self.assertEqual(task_no_data.state, 'SUCCESS')

    def test_failure_state(self):
        bad_task = get_orders.apply_async(args=[self.wrong_user])
        try:
            
            bad_task.get()
        except Exception:
            pass
        self.assertTrue(bad_task.failed())

class GetUserToken(unittest.TestCase):
    def setUp(self):
        self.user_id = '08d350d2-9bf9-4d9f-8243-cc85beb283e8'
    
    def test_success_state(self):
        result = get_user_token(self.user_id)
        self.assertTrue(type(result) is dict)

    def test_failure_state(self):
        result = get_user_token('346ebef1-74e5-4ded-8881-fb73e32b4567')
        self.assertEqual(result, None)

# class StoreTransactionsClass(unittest.TestCase):
#     def setUp(self):
#         self.user_id = '346ebef1-74e5-4ded-8881-fb73e32b4567'
#         print(select_latest('346ebef1-74e5-4ded-8881-fb73e32b4567'))
#         self.task = get_orders.apply_async(args=[get_user_token(self.user_id), select_latest('346ebef1-74e5-4ded-8881-fb73e32b4567')])
#         self.results = self.task.get()
        
#         t0 = time.time()
#         StoreTransactions(self.user_id, self.results).store()
#         t1 = time.time() - t0
#         print('{rows} rows were stored in {sec} seconds'.format(rows=len(self.results), sec=t1))
    
#     def test_success_state(self):
#         self.assertTrue(True)


if __name__ == '__main__':
    unittest.main()
