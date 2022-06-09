FROM php:7.4.10-fpm

RUN apt-get update && apt-get install -y \
    git zip libzip-dev

RUN mkdir -p /usr/local/etc/php/conf.d/ && \
    echo "memory_limit = -1;" > /usr/local/etc/php/conf.d/memory_limit.ini

RUN docker-php-ext-configure zip
RUN docker-php-ext-install zip
RUN docker-php-ext-install pdo pdo_mysql

RUN php -r "readfile('http://getcomposer.org/installer');" | php -- --install-dir=/usr/bin/ --filename=composer
RUN composer self-update 1.10.22

RUN mkdir -p /srv/app/
WORKDIR /srv/app/
