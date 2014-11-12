#!/bin/bash
cd ~
git clone git@git.corp.anjuke.com:jockhu/jockjs-config;
cd jockjs-config;
./jockjs install user ~^jockjs\..*\.dev\.anjuke\.com;
./jockjs start user;

./jockjs install touch ~^jockjs\..*\.dev\.anjuke\.com;
./jockjs start touch;

./jockjs install pad ~^jockjs\..*\.dev\.anjuke\.com;
./jockjs start pad;
