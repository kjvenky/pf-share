define(['jquery',
    'backbone',
    'underscore',
    'text!js/tpl/footer.tpl',
    'js/views/aboutUsView',
    'js/views/staticView',
    'js/views/faqView',
    'js/views/termsView',
    'js/views/privacyView',
    'js/views/returnView',
    'js/views/shippingView',    
    'backbone.bootstrap-modal'
    ],function($,Backbone,_,Template,aboutUsView,staticView,faqView,termsView,privacyView,returnView,shippingView){

        "use strict"

        var footerView = Backbone.View.extend({
            template: _.template(Template),
            initialize:function(){
                _.bindAll(this,'render','aboutUS');
                this.render(); // Renders the requried view
            },

        // el element is important in binding the views
        events:{ // http://stackoverflow.com/questions/12433485/backbone-events-not-binding-to-dom-element
            'click #aboutUS': 'aboutUS',
            'click #faq':"faq",
            'click #terms':"terms",
            'click #privacy':"privacY",
            'click #return':"return",
            'click #shipping':"shipping",
            
        },

        aboutUS:function(){
           var modal = new Backbone.BootstrapModal({ content: new aboutUsView.aboutUsView({type:'footer'}) }).open();
        },

        faq:function(){
           var modal = new Backbone.BootstrapModal({ content: new faqView.faqView() }).open();
        },

        terms:function(){
           var modal = new Backbone.BootstrapModal({ content: new termsView.termsView() }).open();
        },

        privacY:function(){
           var modal = new Backbone.BootstrapModal({ content: new privacyView.privacyView() }).open();
        },

        return:function(){
           var modal = new Backbone.BootstrapModal({ content: new returnView.returnView() }).open();
        },

        shipping:function(){
           var modal = new Backbone.BootstrapModal({ content: new shippingView.shippingView() }).open();
        },

        render: function(){
            this.$el.html(this.template())
            return this // Always return events so that binded customEvents are also returned well
        }

    })
        return {
            footerView: footerView
        }
    })