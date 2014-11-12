#!/bin/bash
info=`uname`
WORK_DIR=$(cd `dirname $0`; pwd)
cd $WORK_DIR
fileList=`find $WORK_DIR |grep '\.php'` 
dirname="home\/www\/workspace"
for file in $fileList
do
if [[ $info == "Linux" ]];then
   sed -i "s/vagrant/${dirname}/g" `grep 'vagrant' -rl ${file}`
else
   replace=`cat ${file} |grep vagrant`
   if [[ ${replace} != '' ]];then
   sed -i '' "s/vagrant/${dirname}/g" ${file}
   fi
fi
done
git st
