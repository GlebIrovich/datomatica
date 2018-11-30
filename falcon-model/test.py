from falcon import testing
from server.app import falcon_app
import unittest
import uuid
import json 
from server.db_functions import fetch_data, delete_data
from server.models.maxes import MaxesModel
from server.db.schema import MaxesModel as MaxModelMap, Transactions
from test_utils import DB
import random

class FalconTestCase(testing.TestCase):
    def setUp(self):
        super(FalconTestCase, self).setUp()

        self.app = falcon_app
        self.db = DB()
        self.user_id = self.db.user_id
    
    def tearDown(self):
        super(FalconTestCase, self).tearDown()

        self.db.delete_user()



class TestResponse(FalconTestCase):
    def test_get_response(self):
        doc = {u'message': u'server is running'}

        result = self.simulate_get('/')
        self.assertEqual(result.json, doc)


class TestFetchMaxes(FalconTestCase):
    def test_success_request(self):
        result = self.simulate_post('/maxes-results', body=json.dumps({'user_id': self.user_id}))
        self.assertEqual(result.status_code, 200)
        self.assertTrue(result.json['user_id'])
        self.assertTrue(len(result.json['data']['data']) > 0)

    def test_missing_user_id(self):
        result = self.simulate_post('/maxes-results', body=json.dumps({}))
        self.assertEqual(result.status_code, 400)
        self.assertTrue(result.json['error'])


class TestModelRequest(FalconTestCase):

    def test_success_request(self):
        result = self.simulate_post('/run', body=json.dumps({'user_id': '123'}))
        self.assertEqual(result.status_code, 200)
        self.assertTrue(result.json['user_id'])

    def test_missing_user_id(self):
        result = self.simulate_post('/run', body=json.dumps({}))
        self.assertEqual(result.status_code, 400)
        self.assertTrue(result.json['error'])


class TestFunctions(unittest.TestCase):
    # def setUp(self):
    #     self.user_id = '08d350d2-9bf9-4d9f-8243-cc85beb283e8'

    def setUp(self):
        self.db = DB()
        self.user_id = self.db.user_id
        

    def tearDown(self):
        self.db.delete_user()

    def test_fetch_data(self):
        result = fetch_data(self.user_id, Transactions)
        self.assertTrue(result is not None)

    def test_fetch_data_wrong_user_id(self):
        result = fetch_data('123', Transactions)
        self.assertTrue(result is None)

        result = fetch_data(str(uuid.uuid1()), Transactions)
        self.assertTrue(result is None)

    def test_delete_data(self):
        result = delete_data(self.user_id, MaxModelMap)
        self.assertTrue(result > 0)

    def test_delete_data_no_user(self):
        result = delete_data(str(uuid.uuid1()), MaxModelMap)
        self.assertEqual(result, 0)


class TestMaxesModel(unittest.TestCase):
    def setUp(self):
        self.db = DB()
        self.user_id = self.db.user_id

    def tearDown(self):
        self.db.delete_user()

    def test_right_input(self):
        model = MaxesModel(self.user_id)
        result = model.analyze()

        self.assertTrue(result is not None)
        self.assertTrue(isinstance(result, dict))

    def test_wrong_input(self):
        model = MaxesModel('123')
        result = model.analyze()

        self.assertTrue(isinstance(result, str))
        self.assertEqual(result, '')


        


if True:
    unittest.main()