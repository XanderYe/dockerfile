#!/bin/bash

function initMysql() {
    rm -rf /var/lib/mysql/*
    mysqld --initialize --user=mysql
    service mysqld start --skip-grant-tables
    mysql -uroot << EOF
flush privileges;
grant all privileges on *.* to 'root'@'localhost' identified by '$MYSQL_ROOT_PASSWORD';
grant all privileges on *.* to 'root'@'%' identified by '$MYSQL_ROOT_PASSWORD';
flush privileges;
EOF
    service mysqld stop
    echo "mysql initialized successfully"
}

if [ ! -d "/var/lib/mysql/mysql" ]; then
    echo "start initializing mysql."
    initMysql
fi

service mysqld start
tail -f /dev/null