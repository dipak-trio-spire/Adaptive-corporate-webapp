#!/bin/bash
ENV_PATH=$1
sudo yum -y install git
cd /home/bitnami
mkdir ./.aws
printf "[default]\nregion = us-east-1\noutput = json\n[profile adaptive-crossaccount-codecommit-role-$ENV_PATH]\nrole_arn = arn:aws:iam::701900371308:role/adaptive-crossaccount-codecommit-role-$ENV_PATH\ncredential_source = Ec2InstanceMetadata\noutput = json\nregion = us-east-1" > ./.aws/config
git config --global credential.helper '!aws codecommit --profile adaptive-crossaccount-codecommit-role-'$ENV_PATH' credential-helper $@'
git config --global credential.UseHttpPath true
rm -rf corporate-webapp
git clone -b $ENV_PATH https://git-codecommit.us-east-1.amazonaws.com/v1/repos/corporate-webapp
cd /home/bitnami/corporate-webapp