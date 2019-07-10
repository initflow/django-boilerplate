FROM nginx

RUN apt-get update \
    && apt-get install -y nginx-extras \
             certbot openssl  \
    && apt-get clean \
    && echo "preparing certbot webroot" \
    && mkdir -p /var/lib/certbot \
    && echo "generating initial self-signed certificate" \
    && mkdir -p /etc/nginx/ssl/example.net/ \
    && openssl req -x509 -nodes -newkey rsa:4096 \
           -keyout /etc/nginx/ssl/example.net/privkey.pem \
           -out /etc/nginx/ssl/example.net/fullchain.pem \
           -subj "/C=/ST=/L=/O=/CN=example.net" \
    && ln -sf /etc/nginx/ssl/example.net /etc/nginx/ssl/latest

RUN mkdir -p /usr/cache

RUN rm /etc/nginx/conf.d/default.conf
RUN rm /etc/nginx/sites-enabled/default

COPY default.conf /etc/nginx/conf.d/default.conf
COPY certbot.sh /etc/nginx/ssl/


ENV TZ=Europe/Moscow
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone


RUN  mkdir /etc/pwd/