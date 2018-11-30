from __future__ import absolute_import, unicode_literals
from celery import Celery

from .settings import settings

CELERY_BROKER = settings['redis']['CELERY_BROKER']
CELERY_BACKEND = settings['redis']['CELERY_BACKEND']


app = Celery('app', broker=CELERY_BROKER, backend=CELERY_BACKEND, include=['server.get_orders'] ) 

print('Celery Connecting')

if __name__ == '__main__':
    app.start()