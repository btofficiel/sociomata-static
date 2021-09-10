#!/bin/bash

cd /home/ubuntu/static
sudo rm -rf .env
sudo npm install
if [ "$DEPLOYMENT_GROUP_NAME" == "StagingStatic" ]
then
    sudo echo ENV=staging >> .env
    sudo sleep 30s
    sudo echo BUNDLE_NAME=$(aws s3api list-objects-v2  --bucket "sociomata-staging-static" --prefix "js/elm" --query Contents[0].Key) >> .env
    sudo echo "Environment variables added successfully"
else
    sudo echo ENV=prod >> .env
    sudo sleep 30s
    sudo echo BUNDLE_NAME=$(aws s3api list-objects-v2  --bucket "sociomata-prod-static" --prefix "js/elm" --query Contents[0].Key) >> .env
    sudo echo "Environment variables added successfully"
fi
