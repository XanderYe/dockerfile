#!/bin/bash

if [ "${1:0:1}" = '-' ]; then
    set -- mysqld "$@"
fi

if [ "$1" = "mysqld" ]; then
  if [ ! -d "$DATADIR/mysql" ]; then
    echo "start initializing MySQL."

    mkdir -p "$DATADIR"
    chown -R mysql:mysql "$DATADIR"

    # 初始化MySQL
    mysqld --initialize-insecure --user=mysql --datadir="$DATADIR"
    # 启动MySQL
    mysqld --user=mysql &
    # 获取进程id
    pid="$!"

    mysql=( mysql --protocol=socket -uroot )

    # 检测mysql是否启动
    for i in {30..0}; do
        if echo 'SELECT 1' | "${mysql[@]}" &> /dev/null; then
            break
        fi
        echo 'MySQL init process in progress...'
        sleep 1
    done
    if [ "$i" = 0 ]; then
        echo >&2 'MySQL init process failed.'
        exit 1
    fi

    # 配置用户和密码
    "${mysql[@]}" -uroot <<-EOSQL
FLUSH PRIVILEGES ;
DELETE FROM mysql.user;
GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' IDENTIFIED BY '$MYSQL_ROOT_PASSWORD' ;
FLUSH PRIVILEGES ;
EOSQL
    if ! kill -s TERM "$pid" || ! wait "$pid"; then
        echo >&2 'MySQL init process failed.'
        exit 1
    fi

    echo
    echo 'MySQL init process done. Ready for start up.'
    echo
  fi
  chown -R mysql:mysql "$DATADIR"

  if [ "$(id -u)" = "0" ]; then
    echo "Switching to dedicated user 'mysql'"
      exec gosu mysql "$BASH_SOURCE" "$@"
  fi
fi

exec "$@"