define(['jquery',
	'backbone',
	'underscore',
	'js/admin/forms/aAddCouponForm'
	],function($,Backbone,_,aAddCouponForm){

		"use strict"

		var aAddCouponView = Backbone.View.extend({
			initialize:function(options){
				this.form = options.form || undefined 
				_.bindAll(this,'render','formSubmit')
				this.render() // Render on initialization to define the form variable
				this.formSubmit() // Render the event
			},

			events:{
				'click button#submitRegister': 'formSubmit',
			},

			formSubmit: function(){
					var that = this;
					// Form validations
					that.form.on('submit', function(event) {
						event.preventDefault();
						var errors = that.form.validate()
								// Remove error classes
								if (errors) { // Show the errors									
									$.each(errors, function(error) {
										$("#" + error).attr('placeholder',errors[error].message)
										.parent().addClass('has-error')
									});
								}
								// If no errors. Do form commit which saves the
								else {	
									$.ajax({
										type:'GET',
										url: contextUrl2+'/admin/persons/createPerson',
										data: that.form.getValue(),
										success:function(message){
											if(message){
													$('#form-messages').css('display','block').html('<div class="alert alert-success" style="font-weight:bold;margin: 10px 65px 0px;font-size: 12px;">New user has been added!</div>').delay(5000).fadeOut('slow');
											}else{
												$('#form-messages').css('display','block').html('<div class="alert alert-danger" style="margin: 10px 65px 0px;font-size: 12px;font-weight:bold;">Adding user details failed</div>').delay(5000).fadeOut('slow');
											}
										}
									})
								}

							})
			},

			render:function(){
				this.form = new aAddCouponForm.aAddCouponForm() // Render form on success
				return this
			}


		})

return {
	aAddCouponView: aAddCouponView
}
})