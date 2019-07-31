#!/usr/bin/expect -f
set timeout -1
set password PAsscloud
spawn scp -r ./dist/. passcloud@192.168.110.75:/nginx/html/.
expect "*assword:*"
send "$password\r"
interact
