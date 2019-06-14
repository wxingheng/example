
## 一个最简单的 node server docker


### 启动一个服务
sudo docker run --name fed-fed-doc -v /nginx/html/fed/fed-doc:/usr/src/app/public -d -p 3000:8080 node-web-app:v1.0