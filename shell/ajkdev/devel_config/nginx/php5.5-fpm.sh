#!/bin/bash
info=`uname`
WORK_DIR=$(cd `dirname $0`; pwd)
cd $WORK_DIR
fileList=`find $WORK_DIR|grep '\.conf'`
to_replace='php5.5-fpm'
for file in $fileList
do
if [[ $info == "Linux" ]];then
sed -i "s/php5-fpm/${to_replace}/g" `grep 'php5-fpm' -rl ${file}`
else
sed -i '' "s/php5-fpm/${to_replace}/g" ${file}
fi
done
git st
