#!/bin/bash
ENV_PATH=$1
export root_path=/home/bitnami/corporate-webapp
sed -i "s/ENV_PATH/$ENV_PATH/g"  $root_path/default_env_var.txt