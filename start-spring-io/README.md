# start-spring-io

## 用途
start.spring.io的docker镜像

## 构建镜像
执行 `docker build -t xanderye/start.spring.io:0.0.1 .`
## 创建容器
执行 `docker run -p 8080:8080 -tid --name spring-initializr xanderye/start.spring.io:0.0.1`