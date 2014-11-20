  (function () { // Anonymuous function to be auto executed.
  "use strict";

// Ref: http://ahamlitt.com/Backbone.localStorage/docs/todos-main.html  
require.config({
  baseUrl: contextUrl+	"/", // Gets appeneded to all the paths,
  waitSeconds:0,
  paths: {
    jquery: 'jquery/dist/jquery',
    underscore: 'underscore/underscore',
    backbone: 'backbone/backbone',
    'backbone.localStorage': 'backbone.localStorage/backbone.localStorage',
    text: 'requirejs-text/text',
    forms: 'backbone-forms/distribution.amd/backbone-forms',
    'backbone.bootstrap-modal': 'backbone.bootstrap-modal/src/backbone.bootstrap-modal',
    cookie:'jquery-cookie/jquery.cookie',
    print: 'jQuery-printPage-plugin/jquery.printPage',
    d3: 'd3/d3.min',
    bootstrap: 'bootstrap/dist/js/bootstrap',
    datepicker: 'bootstrap-3-datepicker/js/bootstrap-datepicker'
  },
  shim: {
    jquery: {
      exports: "$"
    },
    cookie:{
      deps: ['jquery']
    },   
    print:{
      deps: ['jquery']
    },
    underscore: {
      exports: "_"
    },
    backbone: {
      // Check for script dependencies before loading this script
      deps: ['underscore', 	'jquery'],
      exports: 'Backbone'
    },
    'backbone.bootstrap-modal': {
      deps: ['backbone','jquery'],
      exports: 'Backbone'
    },
    'backbone.localStorage': {
      deps: ['backbone'],
      exports: 'Backbone'
    },
    bootstrap: {
      deps: ['jquery']
    },
    datepicker:{
      deps: ['jquery']
    }
  }
});
// Load the application router
require(['js/admin/routers/adminRouter','backbone'],function(adminRouter,Backbone){
  window.admin = new adminRouter.adminRouter(); // Global name space of the
  Backbone.history.start({root: "l2k/admin",'pushState':false});  
  Backbone.history.loadUrl(Backbone.history.fragment)
});
})();