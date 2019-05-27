#!/usr/bin/expect -f
set timeout -1
set password PAsscloud
spawn scp -r ./plasma-screen passcloud@192.168.110.75:/nginx/html/fed
expect "*assword:*"
send "$password\r"
interact
