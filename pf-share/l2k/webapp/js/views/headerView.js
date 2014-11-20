define(['jquery',
    'backbone',
    'underscore',
    'text!js/tpl/header.tpl',
    'js/views/userinfoView',
    'js/views/loginView',
    'js/views/registerView',
    'js/views/aboutUsView',
    'js/views/contactUsView',
    'bootstrap'
    ],function($,Backbone,_,Template,userinfoView,loginView,registerView,aboutUsView,contactUsView,bootstrap){

        "use strict"

        var headerView = Backbone.View.extend({
            template: _.template(Template),
            initialize:function(){
                _.bindAll(this,'render','login','register','aboutus','slideClose');
                this.render(); // Renders the requried view
            },

        // el element is important in binding the views
        events:{ // http://stackoverflow.com/questions/12433485/backbone-events-not-binding-to-dom-element
            'click button#login': 'login',
            'click button#register': 'register',
            'click button#aboutus': 'aboutus',
            'click button#contactus': 'contactus',
        },
        
        slideClose:function(){
        },

        aboutus:function(){
            this.slideClose()
            $('#messages').html(new aboutUsView.aboutUsView().render()).hide().slideDown("slow"); 
        },

        contactus:function(){
            this.slideClose()
            $('#messages').html(new contactUsView.contactUsView().render()).hide().slideDown("slow"); 
        },

        login: function(){
            this.slideClose()
            $('#messages').html(new loginView.loginView().render()).hide().slideDown("slow"); 
        },

        register: function(){
            this.slideClose()
            $('#messages').html(new registerView.registerView().render()).hide().slideDown("slow") // Hard coded
        },

        render: function(){
            this.$el.html(this.template())
            this.userinfo = new userinfoView.userinfoView()
            this.$('#userinfo').append(this.userinfo.render().el)
            return this // Always return events so that binded customEvents are also returned well
        }

    })
        return {
            headerView: headerView
        }
    })