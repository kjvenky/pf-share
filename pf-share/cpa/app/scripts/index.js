(function () { // Anonymuous function to be auto executed.
    "use strict"
   
    require.config({
        baseUrl: contextUrl + "",
        waitSeconds: 0,
        paths: {
            jquery: 'bower_components/jquery/dist/jquery',
            underscore: 'bower_components/underscore/underscore',
            backbone: 'bower_components/backbone/backbone',
            'backbone.localStorage': 'bower_components/backbone.localStorage/backbone.localStorage',
            text: 'bower_components/requirejs-text/text',
            forms: 'bower_components/backbone-forms/distribution.amd/backbone-forms',
            'backbone.bootstrap-modal': 'bower_components/backbone.bootstrap-modal/src/backbone.bootstrap-modal',
            bootstrap: 'bower_components/bootstrap/dist/js/bootstrap',
            marionette: 'bower_components/backbone.marionette/lib/backbone.marionette',
            raphael: 'bower_components/raphael/raphael'
        },
        shim: {
            jquery: {
                exports: "$"
            },
            underscore: {
                exports: "_"
            },
            backbone: {                
                deps: ['underscore', 'jquery'],
                exports: 'Backbone'
            },
            'backbone.localStorage': {
                deps: ['backbone'],
                exports: 'Backbone'
            },
            'backbone.bootstrap-modal': {
                deps: ['backbone'],
                exports: 'Backbone'
            },
            bootstrap: {
                deps: ['jquery']
            },
            marionette: {
                exports: 'Backbone.Marionette',
                deps: ['backbone']
            },
            raphael: {
                exports: 'R',
                deps: ['jquery']
            }
        }
    });

    // Load the application router. Using marionette now.
    require([
        'scripts/app',
        'backbone',
        'scripts/routers/index',
        'scripts/controllers/index'
    ], function (app,Backbone,Router,Controller) {
        'use strict';
        app.start();
        new Router.router({ controller: Controller }); 
        Backbone.history.start(); // Learn exactly what {pushState: true} does
    });
})();