FROM centos:7.9.2009

MAINTAINER XanderYe

COPY docker-entrypoint.sh /usr/local/bin/
COPY mysql80-community-release-el7-3.noarch.rpm /tmp/
COPY gosu /usr/local/bin/

ENV DATADIR="/var/lib/mysql"
ENV MYSQL_ROOT_PASSWORD=123456

RUN sed -e 's|^mirrorlist=|#mirrorlist=|g' \
                 -e 's|^#baseurl=http://mirror.centos.org/centos|baseurl=https://mirrors.ustc.edu.cn/centos|g' \
                 -i.bak /etc/yum.repos.d/CentOS-Base.repo && \
    sed -i "s|enabled=1|enabled=0|g" /etc/yum/pluginconf.d/fastestmirror.conf && \
    yum makecache && \
	rpm -Uvh /tmp/mysql80-community-release-el7-3.noarch.rpm && \
    sed -e 's/enabled=1/enabled=0/g' -e 's/gpgcheck=1/gpgcheck=0/g' -i /etc/yum.repos.d/mysql-community.repo && \
    sed -i '21s/enabled=0/enabled=1/g' /etc/yum.repos.d/mysql-community.repo && \
    yum install -y mysql-community-server && \
	yum clean all && \
    chmod +x /usr/local/bin/gosu && gosu nobody true && \
    cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime && \
    ln -s /usr/local/bin/docker-entrypoint.sh /entrypoint.sh

EXPOSE 3306

VOLUME ["/var/lib/mysql"]

ENTRYPOINT ["/entrypoint.sh"]

CMD ["mysqld"]