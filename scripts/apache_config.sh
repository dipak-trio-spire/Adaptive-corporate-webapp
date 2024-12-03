if ! diff /opt/bitnami/apache/conf/vhosts/wordpress-vhost.conf /home/bitnami/corporate-webapp/external_files/apache_config.txt >/dev/null; then
    sudo mv /opt/bitnami/apache/conf/vhosts/wordpress-vhost.conf /opt/bitnami/apache/conf/vhosts/wordpress-vhost.bkp
    sudo cp /home/bitnami/corporate-webapp/external_files/apache_config.txt /opt/bitnami/apache/conf/vhosts/wordpress-vhost.conf
    sudo /opt/bitnami/ctlscript.sh restart apache
else
    echo "No changes in conf."
fi
