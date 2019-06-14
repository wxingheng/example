
// 开始构建镜像
docker build -t node-web-app:v1.0 .

// 查看镜像列表
docker images

// 删除不需要的镜像
docker rmi  IMAGE_ID 

// 运行一个容器<可能需要登录 或者 sudo>
sudo docker run --name test001  -d -p 6060:8080 node-web-app:v1.2

// 运行一个容器, 并将容器内部与外部映射 <可能需要登录 或者 sudo> 
sudo docker run --name test002 -v :/usr/src/app/public  -d -p 3008:8080 node-web-app:v1.0

// 停止一个容器
docker stop IMAGE_ID 

// 删除不需要的容器
docker rm psname

// 进入容器 
docker exec -it d0ed56c70a40 /bin/bash 

// 导出镜像
docker save -o node-web-app.tar node-web-app:v1.2

// 导入镜像
docker load < node-web-app.tar

//  查看磁盘空间
df -h

