#!/bin/bash
cd /home/bitnami/
# check if node is installed
if ! [ -x "$(command -v node)" ]; then
  echo 'Node.js is not installed, installing...'
  # install node.js and npm
  curl -sL https://deb.nodesource.com/setup_14.x | sudo -E bash -
  sudo apt-get install -y nodejs
else
  echo 'Node.js is already installed'
fi

# check if pm2 is installed
if ! [ -x "$(command -v pm2)" ]; then
  echo 'PM2 is not installed, installing.'
  # install pm2 using npm
  sudo npm install -g pm2
else
  echo 'PM2 is already installed.'
fi