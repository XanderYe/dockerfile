# mysql-5.7

## 用途
基于centos6的mysql5.7镜像

## 构建镜像
执行 `docker build -t xanderye/mysql:centos6-5.7 .`
## 创建容器
```shell
docker run -d \
-p 3306:3306 \
-e MYSQL_ROOT_PASSWORD=123456 \
--restart=unless-stopped \
--name mysql xanderye/mysql:centos6-5.7
```