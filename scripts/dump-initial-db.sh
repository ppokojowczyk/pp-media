#!/bin/bash
set -e
MYSQL_USER=root
MYSQL_PASSWORD=root
MYSQL_HOST=database
MYSQL_DATABASE=pp_media
docker-compose up -d database
docker-compose exec database bash -c "mysqldump -u${MYSQL_USER} -p${MYSQL_PASSWORD} -h${MYSQL_HOST} ${MYSQL_DATABASE}" >./assets/initial-db.sql
docker-compose stop database
exit 0
