import os

settings = {
    'redis' : 
    {
        'CELERY_BROKER'     : os.environ.get('REDIS_URL') or 'redis://localhost:6379/0',
        'CELERY_BACKEND'    : os.environ.get('REDIS_URL') or 'redis://localhost:6379/0'
    },
    'postgresql' : os.environ.get('DATABASE_URL') or 'postgresql+psycopg2://gleb@localhost/gleb',
    'docker': os.environ.get('DOCKER_ENV') or False,
    'MODEL_URL'  : os.environ.get('MODEL_URL') or 'http://localhost:8000',
}