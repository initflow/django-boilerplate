#!/usr/bin/env python2

from fabric.api import hide, env, settings, abort, run, cd, shell_env
from fabric.colors import magenta, red
from fabric.contrib.files import append
from fabric.contrib.project import rsync_project
from fabric.operations import run, put
import os

env.user = 'initflow'
env.abort_on_prompts = True
PATH = '/srv/app'
ENV_FILE = '/srv/app/.env'

VARIABLES = (
    "ALLOWED_HOSTS",
    "SECRET_KEY",
    "DB_NAME",
    "DB_USER",
    "DB_PASS",
    "DB_SERVICE",
    "DB_PORT",

    "DEBUG",

    "TOS",
    "EMAIL",
    "DOMAINS",

    'CACHE_REDIS_URL'

)


def deploy():
    def docker_compose(command):
        with cd(PATH):
            with shell_env(CI_BUILD_REF_NAME=os.getenv(
                    'CI_BUILD_REF_NAME', 'master')):
                run('set -o pipefail; docker-compose %s | tee' % command)

    variables_set = True
    for var in VARIABLES + ('CI_BUILD_TOKEN',):
        if os.getenv(var) is None:
            variables_set = False
            print(red('ERROR: environment variable ' + var + ' is not set.'))
    if not variables_set:
        abort('Missing required parameters')
    with hide('commands'):
        run('rm -f "%s"' % ENV_FILE)
        append(ENV_FILE,
               ['%s=%s' % (var, val) for var, val in zip(
                   VARIABLES, map(os.getenv, VARIABLES))])


    run('cat /srv/gitlab-login | docker login --username %s %s --password-stdin  ' % (
        os.getenv('REGISTRY_USER', 'gitlab-ci-token'),
        os.getenv('CI_REGISTRY','registry.gitlab.com')))
    # run('docker login -u %s -p %s %s' % (os.getenv('REGISTRY_USER',
    #                                                'gitlab-ci-token'),
    #                                      os.getenv('CI_BUILD_TOKEN'),
    #                                      os.getenv('CI_REGISTRY',
    #                                                'registry.gitlab.com')))

    put('docker-compose.prod.yml', PATH)
    put('app.sh', PATH)
    run('cp ' + PATH + '/docker-compose.prod.yml ' + PATH + '/docker-compose.yml')
    run('rm -f ' + PATH + '/docker-compose.prod.yml')
    run('source %s' % ENV_FILE)
    docker_compose("pull")

    # run('docker stop $(docker ps -a -q)')
    # try:
    #     run("docker network disconnect pye_default pye_web_1 -f")
    # except:
    #     pass
    #
    # try:
    #     run("docker network disconnect pye_default $(docker ps -a --filter=\"name=_pye_web\" --format '{{.Names}}') -f")
    # except:
    #     pass

    # remove static volume

    docker_compose('-p boilerplate down')
    run('docker volume rm -f boilerplate_static_files')

    docker_compose('-p boilerplate up -d')

    def run_command_to_web(command):
        run("docker exec -it boilerplate_web_1 " + command)
        # try:
        #     run("docker exec -it  $(docker ps -a --filter=\"name=_pye_web\" --format '{{.Names}}') " + command)
        # except:
        #     pass
        # try:
        #     run("docker exec -it pye_web_1" + command)
        # except:
        #     pass

    with cd(PATH):
        try:
            run('./app.sh cert')
        except:
            pass
        run('./app.sh migrate')
        run('./app.sh collectstatic')
        # run_command_to_web('python manage.py migrate')
        # run_command_to_web('bash -c "cd app && npm i && npm run build"')
        # run_command_to_web('python manage.py collectstatic --noinput')

        # ssh letsencrypt

    run('docker kill -s HUP boilerplate_nginx_1')
