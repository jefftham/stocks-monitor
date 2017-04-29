#!/bin/bash

sudo apt-get install -y iptables-persistent

# route port 80 to 8080 and port 443 to 8443
# refer to https://wiki.jenkins-ci.org/display/JENKINS/Running+Jenkins+on+Port+80+or+443+using+iptables
sudo iptables -t nat -A PREROUTING -i eth0 -p tcp --dport 80 -j REDIRECT --to-port 8080
sudo iptables -t nat -A PREROUTING -i eth0 -p tcp --dport 443 -j REDIRECT --to-port 8443

sudo dpkg-reconfigure iptables-persistent
