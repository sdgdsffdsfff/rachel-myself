#!/bin/sh
filepath=$(cd "$(dirname "$0")"; pwd)
cd $filepath
node cgconfig.js
node boot.js
node r.js -o build.js
