FROM node:14.10.0-alpine3.10
MAINTAINER XanderYe <XanderYe@outlook.com>
COPY ./aliddns.js /app/aliddns.js

RUN cd /app \
    && npm config set registry https://registry.npm.taobao.org \
    && npm install --save @alicloud/pop-core http https querystring \
    && sed -i 's/dl-cdn.alpinelinux.org/mirrors.ustc.edu.cn/g' /etc/apk/repositories \
    && apk -U add tzdata \
    && cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime \
    && apk del tzdata \
    && echo '*/5 * * * * node /app/aliddns.js > /dev/stdout' > /var/spool/cron/crontabs/root

WORKDIR /app

CMD crond -f && node aliddns.js > /dev/stdout
