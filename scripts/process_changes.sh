#!/bin/bash

# Get the PIDs running on port 3000
pids=$(lsof -t -i :3000)

if [ -z "$pids" ]; then
  echo "No processes found running on port 3000."
else
  echo "Processes running on port 3000:"
  echo "$pids"

  # Kill processes
  echo "Killing processes..."
  kill "$pids"
  echo "Processes killed successfully."
fi
exit