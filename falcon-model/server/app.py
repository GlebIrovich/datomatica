# server/app.py

import json
import falcon
from .models.maxes import MaxesModel 
import logging

logger = logging.getLogger('gunicorn.error')

class TestServer(object):
    def on_get(self, req, resp):
        logger.info('GET: /')
        resp.status = falcon.HTTP_200
        resp.body = json.dumps({'message': 'server is running'})


class RunModel(object):

    def on_post(self, req, resp):
        
        try: 
            logger.info('POST: /run')
            if req.content_length:

                data = json.loads(req.stream.read())
                user_id = data['user_id']

                model = MaxesModel(user_id)
                model.analyze()

                resp.body = json.dumps({"user_id": user_id})
                resp.status = falcon.HTTP_200
                
            else:
                resp.body = json.dumps({"error": "missing user_id"})
                resp.status = falcon.HTTP_400
        except Exception:
            resp.status = falcon.HTTP_400
            logging.exception("\nError in POST: /run")
            resp.body = json.dumps({"error": "server error"})

class FetchMaxes(object):

        def on_post(self, req, resp):
            try: 
                logger.info('POST: /maxes-results')
                if req.content_length:

                    data = json.loads(req.stream.read())
                    user_id = data['user_id']

                    model = MaxesModel(user_id)
                    result = model.get_existing_results()

                    resp.body = json.dumps(
                        {
                            "user_id": user_id,
                            "data": result
                        }
                    )
                    resp.status = falcon.HTTP_200
                    
                else:
                    resp.body = json.dumps({"error": "missing user_id"})
                    resp.status = falcon.HTTP_400
            except Exception:
                resp.status = falcon.HTTP_400
                logger.error("\nError in POST: /maxes-results")
                resp.body = json.dumps({"error": "server error"})

falcon_app = falcon.API()

run_model = RunModel()
fetch_maxes = FetchMaxes()
test = TestServer()

falcon_app.add_route('/maxes-results', fetch_maxes)
falcon_app.add_route('/run', run_model)
falcon_app.add_route('/', test)
logger.info('Falcon app successfuly started')