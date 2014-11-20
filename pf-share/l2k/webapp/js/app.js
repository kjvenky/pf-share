(function() { // Anonymuous function to be auto executed.
"use strict"

// Ref: http://ahamlett.com/Backbone.localStorage/docs/todos-main.html  
require.config({
  baseUrl: contextUrl+"/", // Gets appeneded to all the paths
  waitSeconds:0,
  	paths: {
    jquery: 'jquery/dist/jquery',
    underscore: 'underscore/underscore-min',
    backbone: 'backbone/backbone',
    'backbone.localStorage': 'backbone.localStorage/backbone.localStorage',
    text: 'requirejs-text/text',
    forms: 'forms/distribution.amd/backbone-forms',
    'backbone.bootstrap-modal': 'backbone.bootstrap-modal/src/backbone.bootstrap-modal',
    bootstrap: 'bootstrap/dist/js/bootstrap',
    cookie:'jquery-cookie/jquery.cookie',
    intro:'intro.js/intro',
    datepicker:'bootstrap-3-datepicker/js/bootstrap-datepicker',
  },
  shim: {                                                                                     
    jquery: {
      exports: "$"
    },
    cookie:{
      deps: ['jquery']
    },
    underscore: {
      exports: "_"
    },
    backbone: {
      // Check for script dependencies before loading this script
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
    datepicker: {
      deps: ['jquery']
    }
  }
});
// Load the application router
require(['js/routers/appRouter','backbone','intro'],function(appRouter,Backbone,intro){
  window.app = new appRouter.appRouter(); // Global name space of the 
  Backbone.history.start({pushState: true});

  // Intorjs
  $(document).ready(function(){
    $('.introjs-skipbutton').on('click',function(){
      console.log("Skipping for all future version")
      $.cookie('introskipped','1')
    })
    
    if(!$.cookie('introskipped')){
        setTimeout(function(){
          intro().start();
        },1500); 
      }
  })


});
})();