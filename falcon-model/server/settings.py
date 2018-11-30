import os

settings = {
    'redis' : 
    {
        'CELERY_BROKER'     : os.environ.get('CELERY_BROKER') or 'redis://localhost:6379/0',
        'CELERY_BACKEND'    : os.environ.get('CELERY_BACKEND') or 'redis://localhost:6379/0'
    },
    'postgresql' : os.environ.get('DATABASE_URL') or 'postgresql+psycopg2://gleb@localhost/gleb',
    'docker': os.environ.get('DOCKER_ENV') or False
}