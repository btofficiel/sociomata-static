#!/bin/bash

cd /home/ubuntu/static
sudo rm -rf .env
sudo npm install
if [ "$DEPLOYMENT_GROUP_NAME" == "StagingStatic" ]
then
    echo ENV=staging >> .env
    echo "Environment variables added successfully"
else
    echo "Production not setup yet"
fi
