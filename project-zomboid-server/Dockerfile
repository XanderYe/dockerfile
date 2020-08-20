FROM ubuntu:16.04
MAINTAINER XanderYe <XanderYe@outlook.com>
COPY ./sources.list /etc/apt/sources.list
RUN dpkg --add-architecture i386 && \
    apt-get update && \
    apt-get install -y lib32gcc1 libcurl4-gnutls-dev:i386 curl && \
    rm -rf /var/lib/apt/lists/* && \
    mkdir -p /root/PZ && \
    mkdir -p /root/steamcmd && \
    cd /root/steamcmd && \
    curl -sqL "https://steamcdn-a.akamaihd.net/client/installer/steamcmd_linux.tar.gz" | tar zxvf -
RUN taskset -c 0 /root/steamcmd/steamcmd.sh \
            +login anonymous \
            +force_install_dir /root/PZ \
            +app_update 380870 validate \
            +quit
RUN cd /root/PZ && \
    echo "/root/steamcmd/steamcmd.sh +@ShutdownOnFailedCommand 1 +@NoPromptForPassword 1 +login anonymous +force_install_dir /root/PZ +app_update 380870 +quit" > start.sh && \
    echo "/root/PZ/start-server.sh << EOF" >> start.sh && \
    echo "123456" >> start.sh && \
    echo "EOF" >> start.sh && \
    chmod +x start.sh

VOLUME /root/PZ

EXPOSE 16261/udp
WORKDIR /root/PZ
CMD "/root/PZ/start.sh"