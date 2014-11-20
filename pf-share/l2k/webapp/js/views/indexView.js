define(['jquery',
	'backbone',
	'underscore',
	'intro',
	'text!js/tpl/indexTemplate.tpl',
	'js/collections/productCollection',
	'js/collections/cartItemCollection',
	'js/views/productCollectionView',
	'js/views/footerView',
	'js/views/headerView',
	'js/views/registerView',	
	'js/views/zoneFailView',
	'js/utils/userUtils',
	'js/views/outStandingView',
	'js/views/aboutUsView',
    'js/views/staticView',
    'js/views/faqView',
    'js/views/termsView',
    'js/views/privacyView',
    'js/views/returnView',
    'js/views/shippingView', 
	],function($,Backbone,_,intro, indexTemplate, productCollection,
		cartItemCollection,productCollectionView,footerView,headerView,registerView,zoneFailView,userUtils,outStandingView,aboutUsView,staticView,faqView,termsView,privacyView,returnView,shippingView){

		"use strict"

		var indexView = Backbone.View.extend({
			template: _.template(indexTemplate),
			
		initialize:function(options){
			this.query = options.query || undefined
			_.bindAll(this,'render','introStart');
		},

		events:{
			'click #aboutUS': 'aboutUS',
            'click #faq':"faq",
            'click #terms':"terms",
            'click #privacy':"privacy",
            'click #return':"return",
            'click #shipping':"shipping",
            'click #walkthrough': "introStart"
        },

        introStart:function(){
        	console.log('I am here');
        	intro().setOption('showBullets', false).start();
        },


        aboutUS:function(){
           var modal = new Backbone.BootstrapModal({ content: new aboutUsView.aboutUsView() }).open();
        },

        faq:function(){
           var modal = new Backbone.BootstrapModal({ content: new faqView.faqView() }).open();
        },

        terms:function(){
           var modal = new Backbone.BootstrapModal({ content: new termsView.termsView() }).open();
        },

        privacy:function(){
           var modal = new Backbone.BootstrapModal({ content: new privacyView.privacyView() }).open();
        },

        return:function(){
           var modal = new Backbone.BootstrapModal({ content: new returnView.returnView() }).open();
        },

        shipping:function(){
           var modal = new Backbone.BootstrapModal({ content: new shippingView.shippingView() }).open();
        },

		render: function(){	
			// Append HeaderView
			$('#header').append(new headerView.headerView().render().el)
			// Append ContentView
			$('#wrap').append(this.template())
			var value = app.session.outstanding(app.session.attributes.username)
				if(!_.isUndefined(value.amount)){
					$('#pmessages').html(new outStandingView.outStandingView({value:value.amount.availableBalance, txnId: app.cart.txnIds}).render().el).slideDown()
				}

			// Append Footer View
			$('#bFooter').append(new footerView.footerView().render().el)
			// Break the query if it exists
			if(this.query && this.query.split('=')[1] === 'failure'){
				// $('#messages').append('<div class="alert alert-danger" style="font-size:12px;margin:10px 20px;">Your transaction has failed</div>').slideDown('slow')
				userUtils.topMessages('Your transaction failed!','topFailure', 4000)
			}else if(this.query && this.query.split('=')[1] === 'success'){
				app.cart.clearCart()
				// $('#messages').html('<div class="alert alert-success" style="font-size:12px;margin:10px 20px;">Your transaction is successful. Please refresh in case of discrepancies.</div>').slideDown('slow')
				userUtils.topMessages('Your transaction is completed successfully!','topSuccess', 4000)
			}else{}			
		}	

	})
		return {
			indexView: indexView
		}
	})