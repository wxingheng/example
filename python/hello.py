# -*- coding: utf-8 -*-
import urllib2
import bs4

url = "http://www.baidu.com"

print '第一种方法'
response1 = urllib2.urlopen(url)
print response1.getcode()
# print response1.read()
print bs4
