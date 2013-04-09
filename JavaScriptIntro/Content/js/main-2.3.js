﻿require.config({
    paths: {
        'jquery': 'lib/jquery-1.9.1',
        'underscore': 'lib/underscore-1.4.4',
        'backbone': 'lib/backbone-1.0.0',
        'marionette': 'lib/backbone.marionette-1.0.1'
    },
    shim: {
        'backbone': {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        'underscore': {
            exports: '_'
        },
        'marionette': {
          deps: ['underscore', 'jquery', 'backbone'],
          exports: 'Marionette'
        }
    }
});

require(['app-2.3'], function (app) {
    app.start();
});
