#!/bin/bash
PROJECT=/home/pi/iot
BRANCH=master
cd $PROJECT
git checkout $BRANCH
git pull;
yarn;
$PROJECT/node_modules/angular-cli/bin/ng build;
sudo service iot_server stop;
sudo service iot_server start;
