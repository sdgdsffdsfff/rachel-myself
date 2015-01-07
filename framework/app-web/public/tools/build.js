{
    "appDir": "../www",
    "dir": "../www-built",
    "mainConfigFile": "../www/common.js",
    "modules": [
        {
            "name": "../common",
            "include": [
                "lib/require",
                "zepto",
                "zeptoPlugins",
                "utils",
                "zepto.temp",
                "zepto.sp",
                "ajax",
                "app/lib/detect"
            ]
        },
        {
            "name": "../buyer-schedule",
            "include": [
                "app/schedule"
            ],
            "exclude": [
                "../common"
            ]
        },
        {
            "name": "../comment",
            "include": [
                "app/schedule-detail"
            ],
            "exclude": [
                "../common"
            ]
        },
        {
            "name": "../commission",
            "include": [
                "app/commission",
                "ui.autocomplete"
            ],
            "exclude": [
                "../common"
            ]
        },
        {
            "name": "../detail-broker",
            "include": [
                "app/detail-broker"
            ],
            "exclude": [
                "../common"
            ]
        },
        {
            "name": "../detail-property",
            "include": [
                "app/detail-property"
            ],
            "exclude": [
                "../common"
            ]
        },
        {
            "name": "../example-home",
            "include": [
                "ui.calendar",
                "app/example-home"
            ],
            "exclude": [
                "../common"
            ]
        },
        {
            "name": "../example-login",
            "include": [
                "ui.tab",
                "app/example-login"
            ],
            "exclude": [
                "../common"
            ]
        },
        {
            "name": "../favor-property",
            "include": [
                "app/favor-property"
            ],
            "exclude": [
                "../common"
            ]
        },
        {
            "name": "../landlord-schedule",
            "include": [],
            "exclude": [
                "../common"
            ]
        },
        {
            "name": "../list-property",
            "include": [
                "app/list-property"
            ],
            "exclude": [
                "../common"
            ]
        },
        {
            "name": "../my-property",
            "include": [
                "app/my-property"
            ],
            "exclude": [
                "../common"
            ]
        },
        {
            "name": "../order-property",
            "include": [
                "app/order-property"
            ],
            "exclude": [
                "../common"
            ]
        },
        {
            "name": "../property-List",
            "include": [],
            "exclude": [
                "../common"
            ]
        },
        {
            "name": "../schedule-detail",
            "include": [
                "app/schedule-detail"
            ],
            "exclude": [
                "../common"
            ]
        },
        {
            "name": "../schedule",
            "include": [
                "app/schedule"
            ],
            "exclude": [
                "../common"
            ]
        },
        {
            "name": "../scheduleHistory",
            "include": [
                ""
            ],
            "exclude": [
                "../common"
            ]
        },
        {
            "name": "../user-center",
            "include": [
                "app/user-center"
            ],
            "exclude": [
                "../common"
            ]
        },
        {
            "name": "../validate",
            "include": [
                "app/lib/validate",
                "app/test/formValidate"
            ],
            "exclude": [
                "../common"
            ]
        },
        {
            "name": "../verify-phone",
            "include": [
                "app/verify-phone"
            ],
            "exclude": [
                "../common"
            ]
        }
    ]
}