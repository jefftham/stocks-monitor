#!/bin/bash

#  update and upgrade os
sudo apt-get update -y
sudo apt-get upgrade -y

# download nodejs setup script
pushd ~

curl -sL https://deb.nodesource.com/setup_8.x -o nodesource_setup.sh
sudo bash nodesource_setup.sh
sudo apt-get install nodejs -y
sudo apt-get install build-essential -y

popd

# install npm dependencies
npm install

# make the nodejs server script executable
chmod +x ./server.js

# route 80 to 8080 and 443 to 8443
bash iptables.sh

# install PM2
sudo npm install -g pm2

# start service
pm2 start server.js -o ./logs/output.log -e ./logs/error.log

pm2 startup systemd

#  you need to change this. based on the  result of  pm2 startup systemd
sudo env PATH=$PATH:/usr/bin /usr/lib/node_modules/pm2/bin/pm2 startup systemd -u jeff_tham --hp /home/jeff_tham

pm2 save
