echo $DEPLOYMENT_GROUP_NAME;
cd /home/
sudo chown -R bitnami:bitnami bitnami
cd /home/bitnami/corporate-webapp/
sed -i 's/.env.dev/.env.'$DEPLOYMENT_GROUP_NAME'/g' package.json