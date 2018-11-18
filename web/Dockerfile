FROM python:3.6-stretch


ENV PYTHONUNBUFFERED 1


RUN \
  apt-get update && \
  apt-get install -yqq apt-transport-https


RUN mkdir /usr/src/app
WORKDIR /usr/src/app
ADD requirements.txt /usr/src/app/
RUN pip install -r requirements.txt
ADD . /usr/src/app/

