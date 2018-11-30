# project/app/app.py

from celery.result import AsyncResult
import logging
from .get_orders import get_orders
from .db_functions import get_user_token
import json
import falcon

logger = logging.getLogger('gunicorn.error')

class ResponseLoggerMiddleware(object):
    def process_response(self, req, resp, resource, req_succeeded):
        logger.info('{0} {1} {2}'.format(req.method, req.relative_uri, resp.status[:3]))

class TestServer(object):
    def on_get(self, req, resp):
        print('GET: /')
        resp.status = falcon.HTTP_200
        resp.body = json.dumps({'message': 'server is running'})


class CheckStatus(object):

    def on_get(self, req, resp, task_id):
        task_result = AsyncResult(task_id)
        result = {'status': task_result.status, 'result': task_result.result}
        resp.status = falcon.HTTP_200
        resp.body = json.dumps(result)

class SyncResource(object):

    def on_post(self, req, resp):
        try: 
            print('POST: /sync')
            if req.content_length:

                data = json.loads(req.stream.read())
                
                user_id = data['user_id']
                
                user = get_user_token(user_id)
                print(user)
                if not user:
                    resp.status = falcon.HTTP_401
                    return
                user['user_id'] = user_id
                get_orders.delay(user)
                resp.status = falcon.HTTP_200
            else:
                resp.status = falcon.HTTP_400
        except Exception as e:
            resp.status = falcon.HTTP_400
            logger.error("Error in POST: /sync")
            logger.error(e)
            resp.body = json.dumps({"error": "server error"})

falcon_app = falcon.API(middleware=[ResponseLoggerMiddleware()])

sync = SyncResource()
test = TestServer()

falcon_app.add_route('/sync', sync)
falcon_app.add_route('/', test)
falcon_app.add_route('/status/{task_id}', CheckStatus())
