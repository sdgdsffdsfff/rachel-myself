#!/bin/bash 
iam=`whoami`
key=`cat ~/.ssh/id_rsa.pub`
sudo su - root -c "
echo $key > ~/.ssh/authorized_keys 
mkdir -p /home/www/workspace
chown $iam:$iam -R /home/www/
"
basepath=$(cd `dirname $0`; pwd)
if [ ! -d "/home/www/workspace/system" ];then
bash $basepath/clone_code.sh
fi
mkdir -p /home/www/softs
ansible-playbook -vv -i $basepath/provisioning/hosts $basepath/provisioning/playbook.yml

