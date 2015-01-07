exports.buildTpl = {
    "appDir": "../www",
    "dir": "../www-built",
    "mainConfigFile": "../www/common.js",

//    paths: {
//        app: "../app"
//    },
//    baseUrl: "js/lib",
    "modules": [
    //First set up the common build layer.
    {
        //module names are relative to baseUrl
        name: "../common",
        //List common dependencies here. Only need to list
        //top level dependencies, "include" will find
        //nested dependencies.
        include: ["lib/require", "zepto", "zeptoPlugins", "utils", "zepto.temp", "zepto.sp", "ajax", 'app/lib/detect']
    }

    //Now set up a build layer for each page, but exclude
    //the common one. "exclude" will exclude
    //the nested, built dependencies from "common". Any
    //"exclude" that includes built modules should be
    //listed before the build layer that wants to exclude it.
    //"include" the appropriate "app/main*" module since by default
    //it will not get added to the build since it is loaded by a nested
    //require in the page*.js files.


    //============== Begin: Copy from dependencies.txt ==============


    //============== End: Copy from dependencies.txt ==============


    ]
};
