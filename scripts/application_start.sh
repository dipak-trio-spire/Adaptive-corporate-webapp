cd /home/bitnami/corporate-webapp/

# Stop and delete the existing PM2 process
pm2 stop next-app
pm2 delete next-app

# Start new PM2 process for the updated application
pm2 start npm --name "next-app" -- run start:application

# Wait for the application to start
sleep 100

# Check if PM2 process started successfully
if pm2 list | grep -q "next-app.*online"; then
  echo "Application started successfully."
  sleep 10  
  # if ! curl -sSf http://127.0.0.1:3000/ >/dev/null; then
  #   echo "Failed to access the application at http://127.0.0.1:3000/"
  #   exit 1
  # fi
else
  echo "Failed to start the application."
  exit 1
fi