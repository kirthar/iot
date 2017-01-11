#!/bin/bash
PROJECT=/home/pi/iot
cd $PROJECT
git pull;
$PROJECT/node_modules/angular-cli/bin/ng build;
sudo service dash_button stop;
sudo service dash_button start;
