# aliddns

## 用途
阿里DDNS的docker镜像，每5分钟更新一次解析记录

## 修改配置
编辑aliddns.js，填写前五个参数，获取方法百度.[如何获取AccessKey](https://help.aliyun.com/knowledge_detail/48699.html)
```javascript
// regionId
const regionId = "cn-hangzhou"
// accessKeyId
const accessKeyId = ""
// accessSecret
const accessSecret = ""
// 域名
const domainName = ""
// 主机记录 e.g ["www", "@"]
const rr = []
```
## 构建镜像
执行 `docker build -t xanderye/aliddns:1.0 .`
## 创建容器
执行 `docker run -itd --restart=always --name aliddns xanderye/aliddns:1.0`