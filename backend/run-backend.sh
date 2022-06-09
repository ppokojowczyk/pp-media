#!/bin/sh
set -e
composer install
rm -rf ./var/log/
rm -rf ./var/cache/
php ./symfony cache:clear
php -S 0.0.0.0:80 ./public/index.php
