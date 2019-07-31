docker run  \
--name mongodb_server \
-p 27017:27017  \
-v /mysoft/mongodb/configdb:/data/configdb/ \
-v /mysoft/mongodb/db/:/data/db/ \
-d mongo --auth
--------------------- 
作者：xiaojin21cen 
来源：CSDN 
原文：https://blog.csdn.net/xiaojin21cen/article/details/84994452 
版权声明：本文为博主原创文章，转载请附上博文链接！

db.createUser({ user: 'admin', pwd: 'admin123456', roles: [ { role: "userAdminAnyDatabase", db: "admin" } ] });


db.createUser({ user: 'swen', pwd: 'swen123456', roles: [ { role: "readWrite", db: "app" } ] }


db.createUser(
  {
    user: "app",
    pwd: "123456",
    roles: [ { role: "readWrite", db: "app" } ]
  }
)