{
    appDir: '../www',
    dir: '../www-built',
    mainConfigFile: '../www/common.js',
//    paths: {
//        app: '../app'
//    },
//    baseUrl: 'js/lib',
    modules: [
        //First set up the common build layer.
        {
            //module names are relative to baseUrl
            name: '../common',
            //List common dependencies here. Only need to list
            //top level dependencies, "include" will find
            //nested dependencies.
            include: ['lib/require', 'zepto', 'zeptoPlugins', 'utils', 'zepto.temp', 'zepto.sp', 'ajax']
        },

        //Now set up a build layer for each page, but exclude
        //the common one. "exclude" will exclude
        //the nested, built dependencies from "common". Any
        //"exclude" that includes built modules should be
        //listed before the build layer that wants to exclude it.
        //"include" the appropriate "app/main*" module since by default
        //it will not get added to the build since it is loaded by a nested
        //require in the page*.js files.


    //============== Begin: Copy from dependencies.txt ==============
    {
        name: "../buyer-schedule",
        include: ['schedule'],
        exclude: ["../common"]
    },
    {
        name: "../comment",
        include: ['schedule-detail'],
        exclude: ["../common"]
    },
    {
        name: "../detail-broker",
        include: ['app/detail-broker'],
        exclude: ["../common"]
    },
    {
        name: "../detail-property",
        include: ['app/detail-property'],
        exclude: ["../common"]
    },
    {
        name: "../entrust",
        include: ['app/entrust', 'ui.autocomplete'],
        exclude: ["../common"]
    },
    {
        name: "../example-home",
        include: ['ui.calendar', 'app/example-home'],
        exclude: ["../common"]
    },
    {
        name: "../example-login",
        include: ['ui.tab', 'app/example-login'],
        exclude: ["../common"]
    },
    {
        name: "../favor-property",
        include: ['app/favor-property'],
        exclude: ["../common"]
    },
    {
        name: "../landlord-schedule",
        include: [],
        exclude: ["../common"]
    },
    {
        name: "../list-property",
        include: ['app/list-property'],
        exclude: ["../common"]
    },
    {
        name: "../my-property",
        include: ['app/my-property'],
        exclude: ["../common"]
    },
    {
        name: "../order-property",
        include: ['order-property'],
        exclude: ["../common"]
    },
    {
        name: "../property-List",
        include: [],
        exclude: ["../common"]
    },
    {
        name: "../schedule-detail",
        include: ['schedule-detail'],
        exclude: ["../common"]
    },
    {
        name: "../schedule",
        include: ['schedule'],
        exclude: ["../common"]
    },
    {
        name: "../scheduleHistory",
        include: [''],
        exclude: ["../common"]
    },
    {
        name: "../user-center",
        include: ['app/user-center'],
        exclude: ["../common"]
    },
    {
        name: "../verify-phone",
        include: [],
        exclude: ["../common"]
    }

    //============== End: Copy from dependencies.txt ==============


    ]
}
