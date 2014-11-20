define([
	'jquery',
	'backbone',
	'underscore',
	'js/admin/models/aproductModel',
	'text!js/admin/tpl/editProduct.tpl',
	'js/admin/views/aindexView',	
	'backbone.bootstrap-modal',
	'forms',
	],
	function($,Backbone,_,aproductModel,Template,aindexView){

		var product = new aproductModel.aproductModel();
		var aEditProductForm = Backbone.Form.extend({
			template: _.template(Template),
			schema: product.schema,
			templateData: {heading: 'Edit product'},
			events:{
				'dblclick #deleteProduct ': 'deleteProduct',
				submit: function(){this.formSubmit()}, // a bit overkill
			},

			deleteProduct:function(){
				$.ajax({
					url:contextUrl2+'/admin/products/deleteProduct?productName='+$('#productName').val(),
					success:function(data){
						if(data){
							$('#data').css('display','block').html('<div class="alert alert-danger" style="margin: 10px 65px 0px;font-size: 12px;">Product deleted successfully!</div>');
						}else{
							$('#form-messages').css('display','block').html('<div class="alert alert-danger" style="margin: 10px 65px 0px;font-size: 12px;">Product delete failed. Please try again!</div>').delay(5000).fadeOut('slow');
						}
					}
				})
			},

			formSubmit: function(e){
				var that = this;
				// Form validations
				event.preventDefault();
				var errors = this.validate()
				// Remove error classes
				if (errors) { // Show the errors
					$.each(errors, function(error) {
						$("#" + error).attr('placeholder',errors[error].message).parent().addClass('has-error')
					});
				}else {	
					var data = that.getValue()
					var array = data['unitName'].replace(/\s/g, "").split("-");
					data['unitName'] = array[0];
					data['unitValue'] = array[1];
					$.ajax({
						type:'GET',
						url: contextUrl2+'/admin/products/updateProduct',
						data: data,
						success:function(message){
							if(message){
								$('#form-messages').css('display','block').html('<div class="alert alert-success" style="margin: 10px 65px 0px;font-size: 12px;">Details are updated successfully!</div>').delay(5000).fadeOut('slow');
								setTimeout(function(){admin.navigate('products',true)},2000)
							}else{
								$('#form-messages').css('display','block').html('<div class="alert alert-danger" style="margin: 10px 65px 0px;font-size: 12px;">Your update failed. Please try again!</div>').delay(5000).fadeOut('slow');
							}
						}
					})

				}
			},

			validate:function(){
				return aEditProductForm.__super__.validate.call(this);
			},

			getValue:function(){
				return aEditProductForm.__super__.getValue.call(this);
			}

		})

	return { // Returns all the publicly functions from this module
		aEditProductForm: aEditProductForm
	}
});