	define(['jquery', 'backbone', 'underscore', 'text!js/tpl/cartFull.tpl', 'js/views/cartItemView', 'js/views/loginView',
	    'js/views/cartItemCheckoutView', 'js/views/outStandingView', 'js/views/zoneFailView', 'js/utils/userUtils',
	    'js/views/topupView','js/views/userinfoView','js/views/cartTransactionView'
	], function($, Backbone, _, Template, cartItemView, loginView, cartItemCheckoutView, outStandingView,
	    zoneFailView, userUtils, topupView, userinfoView,cartTransactionView) {
	    "use strict"
	    var cartItemCheckoutCollectionView = Backbone.View.extend({
	        el: '#messages',
	        template: _.template(Template),
	        includeDueAmount: true, // Default
	        topUp: false,
	        walletAmount: 0,
	        initialize: function() {
	            _.bindAll(this, 'render', 'paynow', 'paylater', 'closemessages', 'clearCart',
	                'cartConvert', 'login', 'changeQty', 'updatecart', 'includeDues',
	                'destroyView');
	           this.listenTo(this.collection, 'remove reset update', this.render);
	        },
	        events: {
	            "click #deleteCart": "clearCart",
	            'click #paylater': 'paylater',
	            'click #paynow': 'paynow',
	            "click a#closemessage": "closemessages",
	            "click #login": "login",
	            "click #updatecart": "updatecart",
	            "click #includeDues": "includeDues",
	            "click #removeDues": "removeDues",
	            "click #topup": "topup",
	            "click #payfromBalance": "payfromBalance",
	            'focusout #topupValue': "validate"
	        },
      		onSuccess:function(){
	        	var modal = new Backbone.BootstrapModal({ content: new cartTransactionView.cartTransactionView(
	        		{
	        			status: "success",
	        			cartItems: this.collection,
	        			totalAmount: this.collection.getTotal(),
	        			totalItem: this.collection.getTotalItems()
	        		}),
	        		allowCancel: false}).open();		
	         },
	        onFailure:function(){
	        	var modal = new Backbone.BootstrapModal({ content: new cartTransactionView.cartTransactionView(
	        		{
	        			status: "failed",
	        			cartItems: this.collection,
	        			totalAmount: this.collection.getTotal(),
	        			totalItem: this.collection.getTotalItems()
	        		})}).open();
	        },
	        payfromBalance: function() {
	            var that = this;
	            if (this.collection.getTotalweight() <= 10) {
	                if (this.collection.getTotal() >= 20) {
	                    if (app.session.isAuthorized()) {
	                        var cartdata = this.cartConvert(this.collection) // Trigger the send here
	                        cartdata.payLater = false;
	                        cartdata.topUpAndPay = false;
	                        cartdata.payFromBalance = true;
	                        cartdata.topUpAmount = 0;
	                        // Put a statement for processing order
	                        userUtils.webMaskShow()
	                        $('#payfromBalance').attr('disabled', 'disabled').html(
	                                'Processing order ...') // Simple version
	                        $.ajax({
	                            type: 'POST',
	                            data: JSON.stringify(cartdata),
	                            url: contextUrl + '/product/checkout',
	                            success: function(data) {
	                                app.session.outstandingA = undefined
	                                if (data === "success") {
	                                	userUtils.webMaskHide()
	                                	that.onSuccess()	
	                                    // Delete the view from global scopex
	                                    app.views.cartItemCheckoutCollectionView.destroyView();
	                                    app.views.cartItemCheckoutCollectionView =
	                                        undefined;
	                                    var value = userUtils.outstanding(app.session.attributes
	                                            .username)
	                                        // if (value.availableBalance > 0) {
	                                    $('#pmessages').html(new outStandingView.outStandingView({
	                                            value: value.availableBalance,
	                                            txnId: app.cart.txnIds
	                                        }).render().el).slideDown()
	                                        // }
	                                    app.cart.clearCart()
	                                    app.views.products.render() // Really bad :P
	                                    userUtils.topMessages('Your order has been placed successfully!','topSuccess', 5000)

	                                     $('#userinfo').html(new userinfoView.userinfoView().render().el)

	                                }
	                                else {
	                                	userUtils.webMaskHide()
	                                    $('#messages').css('display', 'block').html(
	                                        '<div class="alert alert-danger" style="margin: 10px 15px 0px;font-size: 12px;">Your payment failed. Please try again!</div>'
	                                    ).delay(3000).fadeOut('slow');
	                                }
	                            },
	                            errors: function(message) {
	                            	userUtils.webMaskHide()
	                            	that.onFailure()
	                            	userUtils.topMessages('We are unable to process your order. Please contact administrator.','topFailure', 5000)
	                            }
	                        })
	                    }
	                    else {
	                        $('#messages').html(new loginView.loginView().render()).hide().slideDown(
	                            "slow");
	                    }
	                }
	                else {
	                    $('#cart-messages').html(
	                        '<div class="alert alert-info">Minimum order value is Rs 20.</div>').slideDown()
	                }
	            }
	            else {
	                var modal = new Backbone.BootstrapModal({ content: "<div style='width:600px;font-family:BebasNeue;background:white;font-size:32px;margin:0px auto;margin-top:100px;padding:30px;border:10px solid rgba(0,0,0,0.5);'>You have exceeded maximum order limit of 10kg.</div>" }).open();		
	                $('#cart-messages').html(
	                    '<div class="alert alert-info">You have exceeded maximum order limit of 10kg.</div>'
	                ).slideDown()
	            }
	        },
	        topup: function() {
	            this.topUp = true;
	            $('#topup').attr('disabled', 'disabled')
	            if ($('#topUpForm').length == 0) {
	                $('#topuprow').append(
	                    '<form id="topUpForm" class="form-inline" role="form" style="background:#F5F5F5;border-top:1px solid #ddd;"><div class="form-group" style="padding: 5px 0px;text-align: right;width:100%;"><label for="exampleInputEmail2" style="margin-right:10px;">Enter Topup value :</label><input style="width: 60px;margin:5px 20px 5px 0px;height: 24px;" type="text" class="form-control" id="topupValue" placeholder="Rs."></div></form>'
	                ).slideDown()
	            }
	        },
	        includeDues: function() {
	            this.includeDueAmount = true;
	            this.render()
	        },
	        removeDues: function() {
	            this.includeDueAmount = false;
	            this.render()
	        },
	        changeQty: function() {},
	        updatecart: function() {
	            this.render()
	        },
	        closemessages: function() {
	            $('#messages').slideUp(function() {
	                $(this).html();
	            })
	        },
	        clearCart: function(e) {
	            this.collection.clearCart() // Clear checkout cartview?
	        },
	        paylater: function(e) {
	            var that = this;
	            if (this.collection.getTotalweight() <= 10) {
	                if (this.collection.getTotal() >= 20) {
	                    if (app.session.isAuthorized()) {
	                        var cartdata = this.cartConvert(this.collection) // Trigger the send here
	                        cartdata.payLater = true;
	                        cartdata.topUpAndPay = false;
	                        cartdata.payFromBalance = false;
	                        cartdata.topUpAmount = 0;
	                        // Put a statement for processing order
	                        $('#paylater').attr('disabled', 'disabled').html('Processing order ...') // Simple version
	                        userUtils.webMaskShow()
	                        $.ajax({
	                            type: 'POST',
	                            data: JSON.stringify(cartdata),
	                            url: contextUrl + '/product/checkout',
	                            success: function(data) {
	                                app.session.outstandingA = undefined
	                                if (data === "success") {
	                                	userUtils.webMaskHide()
	                                	that.onSuccess()
	                                    // Delete the view from global scope
	                                    app.views.cartItemCheckoutCollectionView.destroyView();
	                                    app.views.cartItemCheckoutCollectionView =
	                                        undefined;
	                                    var value = userUtils.outstanding(app.session.attributes.username)
	                                        // if (value.availableBalance > 0) {
	                                    $('#pmessages').html(new outStandingView.outStandingView({
	                                            value: value.availableBalance,
	                                            txnId: app.cart.txnIds
	                                        }).render().el).slideDown()
	                                        // }
	                                    app.cart.clearCart()
	                                    app.views.products.render() // Really bad :P
	                                    userUtils.topMessages('Your order has been placed successfully!','topSuccess',5000) // message

	                                }
	                                else {
	                                    $('#messages').css('display', 'block').html(
	                                        '<div class="alert alert-danger" style="margin: 10px 15px 0px;font-size: 12px;">Your payment failed. Please try again!</div>'
	                                    ).delay(3000).fadeOut('slow');
	                                }
	                            },
	                            errors: function(message) {
	                            	that.onFailure()
	                            }
	                        })
	                    }
	                    else {
	                        $('#messages').html(new loginView.loginView().render()).hide().slideDown(
	                            "slow");
	                    }
	                }
	                else {
	                    $('#cart-messages').html(
	                        '<div class="alert alert-info">Minimum order value is Rs 20.</div>').slideDown()
	                }
	            }
	            else {
	            	var modal = new Backbone.BootstrapModal({ content: "<div style='width:600px;font-family:BebasNeue;background:white;font-size:32px;margin:0px auto;margin-top:100px;padding:30px;border:10px solid rgba(0,0,0,0.5);'>You have exceeded maximum order limit of 10kg.</div>" }).open();		
	                
	                $('#cart-messages').html(
	                    '<div class="alert alert-info">You have exceeded maximum order limit of 10kg.</div>'
	                ).slideDown()
	            }
	        },
	        validate: function() {
	            // Regex check
	            var value = $('#topupValue').val();
	            if (!_.isUndefined(value) && value.trim() !== "") {
	                var reg = /^[0-9]*$/;
	                $(".error").remove();
	                if (!reg.test(value)) {
	                    $( '<span class="error" style="font-size:11px;padding:5px 0px;;color:red">Enter a valid amount!</span>'
	                    ).insertAfter($('#topupValue')).slideDown('slow');
	                    $('#totalAmount').text(Math.abs(this.walletAmount)+this.collection.getTotal())
	                    return false
	                }
	                else {
	                    if (parseInt(value) < 20) {
	                        $('<span class="error" style="font-size:11px;padding:5px 0px;;color:red">Enter value greater than Rs 20!</span>'
	                        ).insertAfter($('#topupValue')).slideDown('slow');
	                        $('#totalAmount').text(Math.abs(this.walletAmount)+this.collection.getTotal())
	                        return false
	                    }
	                    if(this.walletAmount<0){
							$('#totalAmount').text(Math.abs(this.walletAmount)+this.collection.getTotal()+parseInt(value))
	                    }
	                   	else{
	                   		$('#totalAmount').text(parseInt(value)+this.collection.getTotal())
	                   	}
	                    return true
	                }
	            }
	            else {
	                $('<span class="error" style="font-size:11px;padding:5px 0px;;color:red">Please enter value!</span>'
	                ).insertAfter($('#topupValue')).slideDown('slow');
					$('#totalAmount').text(Math.abs(this.walletAmount)+this.collection.getTotal())
	            }
	        },
	        paynow: function() {
	            if (this.collection.getTotalweight() <= 10) {
	                if (this.collection.getTotal() >= 20) {
	                    if (app.session.isAuthorized()) {
	                        var cartdata = this.cartConvert(this.collection) // Trigger the send here
	                        cartdata.payLater = false;
	                        cartdata.topUpAndPay = this.topUp;
	                        cartdata.payFromBalance = false;
	                        if (parseInt($('#topupValue').val()) != 0 && this.validate()) {
	                            this.validate()
	                            var topUpVal = parseInt($('#topupValue').val())
	                        }
	                        else {
	                            var topUpVal = 0
	                        }
	                        if (app.session.outstandingA.amount.availableBalance < 0) {
	                            var Balance = -1 * app.session.outstandingA.amount.availableBalance
	                        }
	                        else {
	                            var Balance = 0
	                        }
	                        cartdata.topUpAmount = topUpVal ;
	                        $('#paynow').attr('disabled', 'disabled').html('Processing ...')
	                        userUtils.webMaskShow()
	                        $.ajax({
	                            type: 'POST',
	                            data: JSON.stringify(cartdata),
	                            dataType: 'html',
	                            cache: false,
	                            url: contextUrl + '/product/checkout',
	                            success: function(data) {
	                                app.session.outstandingA = undefined
	                                $('#messages').append('<div>' + data + '</div>')
	                                	console.log("I am here");
	                                	setTimeout(function(){},5000);
	                                	console.log("I am here too");
	                                    submitPayuForm() // Auto trigger the payU form
	                                    userUtils.webMaskHide()
	                            },
	                            errors: function(message) {}
	                        })
	                    }
	                    else {
	                        $('#messages').html(new loginView.loginView().render()).hide().slideDown(
	                            "slow");
	                    }
	                }
	                else {
	                    var modal = new Backbone.BootstrapModal({ content: "<div style='width:600px;font-family:BebasNeue;background:white;font-size:32px;margin:0px auto;margin-top:100px;padding:30px;border:10px solid rgba(0,0,0,0.5);'>Minimum order value is &#8377; 20</div>" }).open();		
	                $('#cart-messages').html(
	                        '<div class="alert alert-info">Minimum order value is Rs 20.</div>').slideDown()
	                	}
	            	}
	            else {
	            	var modal = new Backbone.BootstrapModal({ content: "<div style='width:600px;font-family:BebasNeue;background:white;font-size:32px;margin:0px auto;margin-top:100px;padding:30px;border:10px solid rgba(0,0,0,0.5);'>You have exceeded maximum order limit of 10kg.</div>" }).open();		
	                
	                $('#cart-messages').html(
	                    '<div class="alert alert-info">You have exceeded maximum order limit of 10kg.</div>'
	                ).slideDown()
	            }
	        },
	        cartConvert: function(cart) {
	            var that = this;
	            var c = {};
	            c.username = app.session.attributes.username;
	            c.cartDetailBeanList = [];
	            if (this.includeDueAmount) {
	                c.resolvingTransactionIDs = app.cart.txnIds || [];
	            }
	            else {
	                c.resolvingTransactionIDs = [];
	            }
	            _.each(cart.models, function(model, iterator) {
	            	var value = model.attributes.qty / model.attributes.baseVal;
	                var p = {};
	            	if(model.get('baseUnit')=="No."){
	            		p.baseQuadrupleQty = 0;
		                p.baseDoubleQty = 0;
		                p.baseQty = value;
	            	}else{
	            		p.baseQuadrupleQty = Math.floor(value / 4);
		                p.baseDoubleQty = Math.floor((value % 4) / 2);
		                p.baseQty = Math.floor(((value % 4)) % 2);
	            	}
	                p.productName = model.attributes.productName;
	                c.cartDetailBeanList.push(p);
	            });
	            return c;
	        },
	        destroyView: function() {
	            this.undelegateEvents();
	            this.$el.removeData().unbind();
	        },
	        login: function() {
	            //this.destoryView()
	            $('#messages').html(new loginView.loginView().render()).hide().slideDown("slow");
	        },
	        buttonsToShow: function() {
	            var buttons;
	            $.ajax({
	                type: 'GET',
	                async: false,
	                url: contextUrl + '/user/wallet/buttonsToShow?username=' + app.session.attributes
	                    .username,
	                success: function(data) {
	                    buttons = data
	                }
	            })
	            return buttons
	        },
	        render: function() { // Triggers on every change to cart
	            // zones allowed implementation
	            var allowed = true;
	            if (app.session.isAuthorized()) {
	                if (!app.session.isAllowed()) {
	                    allowed = false;
	                    $('#messages').html(new zoneFailView.zoneFailView().render().el).slideDown()
	                }
	            }
	            if (app.session.isAuthorized) {
	                var value = app.session.outstanding(app.session.attributes.username)
	                if (value.availableBalance > 0) {
	                    $('#pmessages').html(new outStandingView.outStandingView({
	                        value: value.availableBalance,
	                        txnId: app.cart.txnIds
	                    }).render().el).slideDown()
	                }
	            }
	            if (_.isEmpty(value) && _.isObject(value)) {
	                var value = 0
	            }
	            this.walletAmount = value.amount.availableBalance
	            var totalAmount = this.collection.getTotal() // Get total always	        
	            if (this.collection.getTotalItems() > 0) {
	                this.$el.html(this.template({
	                        totalAmount: Math.floor(totalAmount * 100) / 100,
	                        totalItems: this.collection.getTotalItems(),
	                        auth: app.session.isAuthorized(),
	                        value: this.walletAmount,
	                        includeDueAmount: this.includeDueAmount,
	                        allowed: allowed,
	                        buttons: this.buttonsToShow()
	                    })).show()
	                    // Empty the basket and render it again. Oops! not a good way
	                _.each(this.collection.models, function(item) {
	                    $('#checkoutcart').append(new cartItemCheckoutView.cartItemCheckoutView({
	                            model: item
	                        }).render()) // Make this generic to add				
	                }, this)
	            }
	            else {
	                $('#messages').slideUp(500, function() {
	                    $(this).html();
	                });
	            }
	        },
	    })
	    return {
	        cartItemCheckoutCollectionView: cartItemCheckoutCollectionView
	    }
	})