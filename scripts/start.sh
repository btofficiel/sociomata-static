sudo pm2 stop cicd
# actually start the server
sudo pm2 start /home/ubuntu/cicd/index.js --name "cicd"
