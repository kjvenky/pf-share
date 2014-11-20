/*jslint browser: true*/
/*jslint nomen: true*/
/*global require, define, contextUrl*/
define(['jquery', 'backbone', 'underscore', 'scripts/views/index', 'scripts/views/info'], function($, Backbone, _, Index, Info) {
    "use strict";
    var Router = Backbone.Router.extend({

        routes: {
            "": "index",
            "search/:from/:to": "search",
            "*value": "error404"
        },

        error404: function(value) {
            this.index();
            $("#content-cards").html('<div class="container" style="text-align:center;padding:30px 0px;"><span style="line-height:180px;font-size:172px;">404</span><br><span style="font-size:34px;">Page not found!</span></div>');
        },

        index: function() {
            this.home = new Index()
            $(".content").html(this.home.render().el);
            $("#content-info").append(new Info().render().el);
        },

        search: function(from,to) {
            this.index();
            window.App.Routers.Main.navigate('/search/'+from+'/'+to+'');                          
            this.home.checkData(from,to);

        }

    });
    return Router;
});