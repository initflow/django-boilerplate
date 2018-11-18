#!/usr/bin/env bash
su -c "celery -A apps.core worker -l info"