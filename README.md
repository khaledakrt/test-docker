cd ~/app/test-docker/front

docker build -t my-angular-app .

cd ~/app/test-docker/back

docker build -t my-node-app .

docker run -d -p 4200:80 my-angular-app

docker run -d -p 3000:3000 my-node-app
