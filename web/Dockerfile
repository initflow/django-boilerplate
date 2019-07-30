FROM node:10 as frontend

COPY ./app/package*.json /app/app/
WORKDIR /app/app
RUN npm i

COPY ./app /app/app/

RUN npm run build && cp webpack-stats.json webpack-stats-live.json

FROM python:3.6-stretch
ENV PYTHONUNBUFFERED 1

RUN pip install -U pip && pip install pipenv

COPY ./requirements.txt /usr/src/app/

WORKDIR /usr/src/app

RUN pip install -r requirements.txt

RUN mkdir -p /usr/src/app/app/static && mkdir -p /usr/src/app/app/media  && mkdir -p /usr/src/app/app/static

COPY . /usr/src/app/

COPY --from=frontend /app/static /usr/src/app/static
COPY --from=frontend /app/app/webpack*.json /usr/src/app/app/


#RUN python manage.py collectstatic --noinput
#
#RUN apt-get update && \
#  apt-get install -yq wget tar && \
#  mkdir wkhtmltopdf-download && \
#  cd wkhtmltopdf-download && \
#  wget https://github.com/wkhtmltopdf/wkhtmltopdf/releases/download/0.12.3/wkhtmltox-0.12.3_linux-generic-amd64.tar.xz && \
#  tar -xf wkhtmltox-0.12.3_linux-generic-amd64.tar.xz && \
#  chmod +x wkhtmltox/bin/* && \
#  mv wkhtmltox/bin/* /usr/local/bin && \
#  rm -rf * && \
#  rm -rf /var/lib/apt/lists/* && \
#  wkhtmltopdf --version

#RUN SECRET_KEY=dummy python3 manage.py collectstatic --no-input
#RUN cp -r /usr/src/app/static /usr/src/app/app/


ENV TZ=Europe/Moscow
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

CMD ["gunicorn", "app.wsgi", "-w", "2", "--max-requests", "1000", "-b", "0.0.0.0:8000"]
