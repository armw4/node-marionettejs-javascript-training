﻿require.config({
    paths: {
        'jquery': 'lib/jquery-1.9.1',
        'underscore': 'lib/underscore-1.4.4',
        'backbone': 'lib/backbone-1.0.0'
    },
    shim: {
        'backbone': {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        'underscore': {
            exports: '_'
        }
    }
});

require(['app-2.1'], function (app) {
    app.start();
});