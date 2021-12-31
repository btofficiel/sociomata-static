#!/bin/bash

cd /home/ubuntu/static
sudo rm -rf .env
sudo npm install
if [ "$DEPLOYMENT_GROUP_NAME" == "StagingStatic" ]
then
    echo ENV=staging >> .env
    sleep 30s
    echo BUNDLE_NAME=$(aws s3api list-objects-v2  --bucket "sociomata-staging-static" --prefix "js/elm" --query Contents[0].Key) >> .env
    echo INDIA_PRICEID=price_1K2xqWKcyxmBD8j5Gjd1RyyZ >> .env
    echo GLOBAL_PRICEID=price_1K7eMoKcyxmBD8j5LUt046h7 >> .env
    echo "Environment variables added successfully"
else
    echo ENV=prod >> .env
    sleep 30s
    echo BUNDLE_NAME=$(aws s3api list-objects-v2  --bucket "sociomata-prod-static" --prefix "js/elm" --query Contents[0].Key) >> .env
    echo "Environment variables added successfully"
fi
