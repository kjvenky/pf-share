define(
	[ 'jquery', 'backbone', 'underscore', 'text!js/tpl/outstanding.tpl', ],
	function($, Backbone, _, Template) {

		"use strict"

		var outStandingView= Backbone.View.extend({
			template : _.template(Template),
			initialize : function(options) {
				_.bindAll(this, 'render','payout','cartConvert');
				this.value = options.value || undefined,
				this.txnId = options.txnId || undefined,
				this.render(); // Renders the requried view
			},

			events : { // http://stackoverflow.com/questions/12433485/backbone-events-not-binding-to-dom-element
				"click #payout": 'payout'
			},

			payout:function(e){ 
				e.preventDefault()
				if(app.session.isAuthorized()){// Accept only on login

					var cartdata = this.cartConvert(this.collection) // Trigger the send here
					cartdata.payLater = false;
					$("#payout").attr('disabled', 'disabled').html('Processing ...') 
					$.ajax({
						type:'POST',
						data:  JSON.stringify(cartdata),
						cache: false,
						url: contextUrl + '/product/checkout',
						success:function(data){
							app.session.outstandingA = undefined
							$('#messages').append('<div>'+data+'</div>').slideDown()
							submitPayuForm();
						},
						errors:function(message){
						}
					})

				}else{
					$('#messages').html(new loginView.loginView().render()).hide().slideDown("slow"); 
				}
			},

			cartConvert: function(cart){ // No cart
				var that = this;
				var c={};
				c.username = app.session.attributes.username;
				c.cartDetailBeanList=[];
				c.resolvingTransactionIDs = this.txnId || []; // save the transaction id
				return c;
			},
			
			render : function() {
				this.$el.html(this.template({value:this.value, txnId: this.txnId}))
				return this
			}

		})
return {
	outStandingView: outStandingView
}
})