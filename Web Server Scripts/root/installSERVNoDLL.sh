#!/bin/bash

sudo wget https://www.dropbox.com/s/l5us91s9m752fw7/SERVWeb.zip
sudo unzip SERVWeb.zip
rm SERVWeb/*.aspx.cs
sudo mv SERVWeb/*.aspx /var/www/
sudo mv SERVWeb/js/*.js /var/www/js/
sudo mv SERVWeb/img/* /var/www/img/
rm SERVWeb.zip
rm -r SERVWeb
rm -r __MACOSX
sudo wget http://localhost/Default.aspx
sudo rm Default.aspx
