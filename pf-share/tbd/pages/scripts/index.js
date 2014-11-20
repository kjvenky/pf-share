/*jslint browser: true*/
/*jslint nomen: true*/
/*global require, define, contextUrl*/
(function () { // Anonymuous function to be auto executed.
    "use strict";
    require.config({
        baseUrl: contextUrl + "/pages",
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
            raphael: 'bower_components/raphael/raphael',
            async: 'bower_components/requirejs-plugins/src/async',
            google: 'scripts/gmaps'
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
            raphael: {
                exports: 'R',
                deps: ['jquery']
            }
        }
    });

    // Load the application router. Using marionette now.
    define([
        'backbone',
        'scripts/routers/Router'
    ], function (Backbone, Router) {
        //  initialize globals
        window.App = {   
            Routers: {},
            Views:{},
            Utils:{},
            Collections:{},
            Models:{},
            Mixins:{},
            Vent: _.clone(Backbone.Events) // Handle events locally
        }

        App.Routers.Main = new Router();
        Backbone.history.start({pushState: true, root: '/TBD/'}); // Learn exactly what {pushState: true} does
    });
}());