#!/bin/bash
PROJECT=/home/pi/iot
BRANCH=master
cd $PROJECT
git checkout $BRANCH
git pull;
yarn;
$PROJECT/node_modules/angular-cli/bin/ng build;
sudo service dash_button stop;
sudo service dash_button start;
