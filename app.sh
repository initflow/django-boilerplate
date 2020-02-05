#!/usr/bin/env bash
FUNCTION=
if [ ! -z $1 ]; then
    FUNCTION="$1"
fi





show-help() {
    echo 'Functions:'
    echo './app.sh [start] [stop] [restart] [build] [first_run]'
}

rundocker() {
    echo 'Stop all containers'
    docker stop $(docker ps -a -q)
    echo ''
    echo 'Start containers'
    docker-compose -p boilerplate up -d
    echo ''
}

start() {
    rundocker
    migrate
    #create_static
}

migrate() {
    docker exec -it $(get_container_name 'web') python manage.py migrate
}

dump() {
  mkdir -p ./dumps
  docker exec -t $(get_container_name 'postgres') pg_dumpall -c -U postgres > ./dumps/dump_`date +%d-%m-%Y"_"%H_%M_%S`.sql
}

logs() {
  docker logs $(get_container_name 'web')
}

celery_logs() {
  docker logs $(get_container_name 'worker')
}

redis_logs() {
  docker logs $(get_container_name 'redis')
}


createsuperuser() {
    docker exec -it $(get_container_name 'web') python manage.py createsuperuser

}


makemigrations() {
    docker exec -it $(get_container_name 'web') python manage.py makemigrations

}


collectstatic() {
    docker exec -it $(get_container_name 'web') python manage.py collectstatic --noinput
}

build_frontend() {
    docker exec -it $(get_container_name 'web') bash -c "cd app && npm ci && npm run build && cp webpack-stats.json webpack-stats-live.json"
}


sync_database() {
    docker exec -it $(get_container_name 'web') python manage.py sync_database
}


get_container_name() {
   docker ps -a --filter="name=boilerplate_$1" --format '{{.Names}}'
}






stop() {
    echo 'Stop all containers'
    docker stop $(docker ps -a -q)
}

restart() {
    start
}

first_run() {
    local DB_NAME=$(get_variable 'DB_NAME')
    local DB_USER=$(get_variable 'DB_USER')
    local DB_PASS=$(get_variable 'DB_PASS')
    rundocker

    docker exec -it $(get_container_name 'postgres') psql -U postgres -c "CREATE DATABASE $DB_NAME;"
    docker exec -it $(get_container_name 'postgres') psql -U postgres -c  "CREATE USER $DB_USER WITH ENCRYPTED PASSWORD '$DB_PASS';"
    docker exec -it $(get_container_name 'postgres') psql -U postgres -c  "GRANT ALL PRIVILEGES ON DATABASE $DB_NAME TO  $DB_USER;"
    start
}



update() {
   echo 'Build containers with cache'
   docker-compose -p boilerplate build worker
   docker-compose -p boilerplate build web
}




build() {
   echo 'Build containers'
   docker-compose -p boilerplate build worker --no-cache
   docker-compose -p boilerplate build --no-cache
}


get_variable(){
    while read p; do
      A="$(echo $p | cut -d'=' -f1)"
      B="$(echo $p | cut -d'=' -f2)"
      if [[ $A = $1 ]]
      then
        echo $B
      fi
    done <.env
}

cert() {
    docker exec -it $(get_container_name 'nginx') /etc/nginx/ssl/certbot.sh -v
}

case "$1" in
-h|--help)
    show-help
    ;;
*)
    if [ ! -z $(type -t $FUNCTION | grep function) ]; then
        $1
    else
        show-help
    fi
esac