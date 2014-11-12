#!/bin/bash
mkdir -p /home/www/workspace
cd /home/www/workspace

if [ ! -d 'logs/nginx' ];then
    mkdir -p logs/nginx
fi

echo "-----copying code into vagrant-----"
git clone git@gitlab.corp.anjuke.com:_site/anjuke.git anjuke-site
git clone git@gitlab.corp.anjuke.com:_site/haozu.git haozu-site
git clone git@gitlab.corp.anjuke.com:_site/jinpu.git jinpu-site
git clone git@gitlab.corp.anjuke.com:_site/wechat.git wechat
git clone git@gitlab.corp.anjuke.com:_site/user-site.git user-site
git clone git@gitlab.corp.anjuke.com:_site/pages.git pages
git clone git@gitlab.corp.anjuke.com:_apf/v2-system.git system
git clone git@gitlab.corp.anjuke.com:_apf/system-ext.git system-ext
git clone git@gitlab.corp.anjuke.com:_site-tools/devel-config
git clone git@git.corp.anjuke.com:jianqiangni/pg_so no-debug-non-zts-20090626
mkdir pages-anjuke
cd pages-anjuke
svn checkout http://projects.dev.anjuke.com/svn/sites/pages anjuke --username jamesjiang --password james323
cd ../
echo "-----get early anjuke-pages end-----"

echo "-----get early haozu-pages start-----"
mkdir pages-haozu
cd pages-haozu
git clone git@git.corp.anjuke.com:haozu/pages haozu
cd ../
echo "-----get early haozu-pages end-----"

echo "-----get early jinpu-pages start-----"
mkdir pages-jinpu
cd pages-jinpu
git clone git@git.corp.anjuke.com:jinpu/pages jinpu
cd ../
echo "-----get early jinpu-pages end-----"


bash /home/www/workspace/devel-config/sed.sh
