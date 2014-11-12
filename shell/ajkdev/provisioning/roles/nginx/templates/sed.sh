#!/bin/bash
WORK_DIR=$(cd `dirname $0`; pwd)
cd $WORK_DIR
fileList=`find $WORK_DIR |grep conf`
dirname="home\/www\/workspace"
for file in $fileList
do
echo $file
sed -i "s/vagrant/${dirname}/g" `grep 'vagrant' -rl ${file}`
done

