# base image
FROM python:3.6
# RUN apk add --no-cache python

# set working directory
RUN mkdir -p /app
WORKDIR /app

# add requirements
COPY requirements.txt ./requirements.txt

# RUN set -xe \
#     && apt-get update \
#     && apt-get install python-pip

RUN pip install --upgrade pip

# postgres dependencies
# RUN apk update && \
#  apk add postgresql-libs && \
#  apk add --virtual .build-deps gcc musl-dev postgresql-dev && \
#  python3 -m pip install -r requirements.txt --no-cache-dir && \
#  apk --purge del .build-deps

# install requirements
RUN pip install -r requirements.txt

EXPOSE 8000

# add app
COPY . .
# /usr/src/app