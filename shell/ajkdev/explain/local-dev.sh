
 
#/home/benlinhuo/dev_env/init.sh文件内容#
 #!/bin/bash
 iam=`whoami`  #输出：benlinhuo
 key=`cat ~/.ssh/id_rsa.pub`
 #sudo su - root -c 'command'，即用root命令执行-c后面的一个命令
 #chown 更改某个文件或目录的所有者，将/home/www的所有者改为benlinhuo
 sudo su - root -c "
 echo $key > ~/.ssh/authorized_keys 
 mkdir -p /home/www/workspace
 chown $iam:$iam -R /home/www/
 "
 
 #$(cd `dirname $0`; pwd)是用于输出当前路径。用法：$(shell;pwd)
 basepath=$(cd `dirname $0`; pwd)
 if [ ! -d "/home/www/workspace/system" ];then
 #bash shell文件，表示执行该文件
 #该文件主要是用于clone一系列的代码，包括anjuke以及图片库，配置文件devel-config等等
 #该文件最后执行bash /home/www/workspace/devel-config/sed.sh文件
 bash $basepath/clone_code.sh
 fi
 mkdir -p /home/www/softs
 ansible-playbook -vv -i $basepath/provisioning/hosts $basepath/provisioning/playbook.yml
 
 





#/home/www/workspace/devel-config/sed.sh文件内容#
 #!/bin/bash
 info=`uname` #显示当前操作系统名称
 WORK_DIR=$(cd `dirname $0`; pwd)
 cd $WORK_DIR
 fileList=`find $WORK_DIR |grep '\.php'` #/home/www/workspace/devel-config下的所有.php文件，包括子目录
 dirname="home\/www\/workspace"
 for file in $fileList
 do
 	#当前操作系统为Linux时
 if [[ $info == "Linux" ]];then
 	#将该php文件中所有的字符串'vagrant'都替换为${dirname}所代表的字符
 	#(所以在我们把devel-config删除再重新clone下来时，需要自己手动用该命令替换掉php文件中的所有vagrant)
    sed -i "s/vagrant/${dirname}/g" `grep 'vagrant' -rl ${file}`
 else
    replace=`cat ${file} |grep vagrant`
    if [[ ${replace} != '' ]];then
    sed -i '' "s/vagrant/${dirname}/g" ${file}
    fi
 fi
 done
 git st
