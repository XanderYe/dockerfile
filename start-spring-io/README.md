# start-spring-io

## 用途
[start.spring.io](https://start.spring.io/)的镜像，构建一次即是最新站点

## 构建镜像
执行 `docker build -t xanderye/start.spring.io:20.8.17 .`
## 创建容器
执行 `docker run -p 8080:8080 -tid --name spring-initializr xanderye/start.spring.io:20.8.17`