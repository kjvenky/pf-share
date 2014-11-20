define(['jquery',
    'backbone',
    'underscore',
    'text!js/admin/tpl/aheader.tpl',
//    'js/views/userinfoView',
//    'js/views/loginView',
//    'js/views/registerView',
    ],function($,Backbone,_,Template,userinfoView,loginView,registerView){

        "use strict"

        var aheaderView = Backbone.View.extend({
            template: _.template(Template),
            initialize:function(){
                _.bindAll(this,'render','login','register');
                this.render(); // Renders the requried view
            },

        // el element is important in binding the views
        events:{ // http://stackoverflow.com/questions/12433485/backbone-events-not-binding-to-dom-element
            'click button#login': 'login',
            'click button#register': 'register',
        },

        login: function(){
//            $('#messages').html(new aloginView.aloginView().render()).hide().slideDown("slow"); 
        },

        register: function(){
//            $('#messages').html(new aregisterView.raegisterView().render()).hide().slideDown("slow") // Hard coded
        },

        render: function(){
            this.$el.html(this.template())
//            this.userinfo = new userinfoView.userinfoView()
//            this.$('#userinfo').append(this.userinfo.render().el)
            return this // Always return events so that binded customEvents are also returned well
        }

    })
        return {
            aheaderView: aheaderView
        }
    })