cd /home/bitnami/
sudo amazon-linux-extras list | grep nginx
sudo amazon-linux-extras enable nginx1
sudo yum clean metadata
sudo yum -y install nginx
sudo systemctl start nginx.service
sudo systemctl enable nginx
sudo mv /etc/nginx/nginx.conf /etc/nginx/nginx.conf.bkp
sudo cp /home/bitnami/corporate-webapp/external_files/ngnix_config.txt  /etc/nginx/nginx.conf
sudo service nginx reload
sudo systemctl restart nginx.service
sudo systemctl enable nginx