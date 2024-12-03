cd /home/bitnami/corporate-webapp/
sudo npm install -g yarn
rm -rf node_modules
rm -rf package-lock.json
rm -rf /home/bitnami/corporate-webapp/.next
rm -rf /home/bitnami/corporate-webapp/.next/cache
rm -rf node_modules package-lock.json yarn.lock .next
npm install
chmod -R 777 /home/bitnami/corporate-webapp/.next
echo "Started app successfully!!"
exit