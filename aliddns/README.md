# project-zomboid-server

## 用途
阿里DDNS的docker镜像，每5分钟更新一次解析记录

## 修改配置
编辑aliddns.js，填写前五个参数，获取方法百度
## 构建镜像
执行 `docker build -t xanderye/aliddns:1.0 .`
## 创建容器
执行 `docker run -itd --restart=always --name aliddns xanderye/aliddns:1.0`