#!/bin/bash

#  update and upgrade os
sudo apt-get update -y
sudo apt-get upgrade -y

# download nodejs setup script
pushd ~

curl -sL https://deb.nodesource.com/setup_7.x -o nodesource_setup.sh
sudo bash nodesource_setup.sh
sudo apt-get install nodejs -y
sudo apt-get install build-essential -y

popd

# make the nodejs server script executable
chmod +x ./server.js

# install PM2
sudo npm install -g pm2

# start service
pm2 start server.js

sudo pm2 startup systemd


# check status
systemctl status pm2

# route port 80 to 8080 and port 443 to 8443
# refer to https://wiki.jenkins-ci.org/display/JENKINS/Running+Jenkins+on+Port+80+or+443+using+iptables
iptables -t nat -A PREROUTING -i eth0 -p tcp --dport 80 -j REDIRECT --to-port 8080
iptables -t nat -A PREROUTING -i eth0 -p tcp --dport 443 -j REDIRECT --to-port 8443
