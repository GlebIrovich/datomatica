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

# install requirements
RUN pip install -r requirements.txt

EXPOSE 8001

# add app
COPY . .
# /usr/src/app