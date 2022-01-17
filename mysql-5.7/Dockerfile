FROM centos:centos6.9

MAINTAINER XanderYe

COPY docker-entrypoint.sh /
COPY CentOS-Base.repo /etc/yum.repos.d/
COPY mysql80-community-release-el6-3.noarch.rpm /

ENV MYSQL_ROOT_PASSWORD=123456

RUN cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime \
    && yum makecache \
	&& rpm -Uvh mysql80-community-release-el6-3.noarch.rpm \
    && sed -i 's/enabled=1/enabled=0/g' /etc/yum.repos.d/mysql-community.repo \
    && sed -i '21s/enabled=0/enabled=1/g' /etc/yum.repos.d/mysql-community.repo \
    && yum install -y initscripts mysql-community-server \
	&& yum clean all

EXPOSE 3306

VOLUME ["/var/lib/mysql"]

ENTRYPOINT ["/docker-entrypoint.sh"]