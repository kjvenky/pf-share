define(['js/admin/models/ausersModel',
	'text!js/admin/tpl/editUser.tpl',
	'jquery',
	'backbone',
	'underscore',
	'js/views/aboutUsView',
	'forms',
	'backbone.bootstrap-modal',
	],
	function(ausersModel,Template,$,Backbone,_,aboutUsView){

		var user = new ausersModel.ausersModel();
		var aEditUserForm = Backbone.Form.extend({
			template: _.template(Template),
			schema: user.schema,
			templateData: {heading: 'Edit user'},				
			events:{
				'dblclick #deleteUser ': 'deleteUser',
				submit: function(){this.formSubmit()}, // a bit overkill
			},

			deleteUser:function(){
				$.ajax({
					url:contextUrl2+'/admin/persons/deletePerson?username='+$('#username').val(),
					success:function(data){
						if(data){
							$('#data').css('display','block').html('<div class="alert alert-danger" style="margin: 10px 65px 0px;font-size: 12px;">User deleted successfully!</div>');
						}else{
							$('#form-messages').css('display','block').html('<div class="alert alert-danger" style="margin: 10px 65px 0px;font-size: 12px;">User delete failed. Please try again!</div>').delay(5000).fadeOut('slow');
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
						$("#" + error).attr('placeholder',errors[error].message)
						.parent().addClass('has-error')
					});
				}else {	
					$.ajax({
						type:'GET',
						url: contextUrl+'/admin/persons/updatePerson',
						data: that.getValue(),
						success:function(message){
							if(message){
								$('#form-messages').css('display','block').html('<div class="alert alert-success" style="margin: 10px 65px 0px;font-size: 12px;">User details are updated successfully!</div>').delay(5000).fadeOut('slow');
							}else{
								$('#form-messages').css('display','block').html('<div class="alert alert-danger" style="margin: 10px 65px 0px;font-size: 12px;">User details update failed. Please try again!</div>').delay(5000).fadeOut('slow');
							}
						}
					})

				}
			},

			validate:function(){ // Run specific validations here!
				return aEditUserForm.__super__.validate.call(this);
			},
			
			getValue:function(){ // Used in form submit
				return aEditUserForm.__super__.getValue.call(this);
			}

		})		    

	return { // Returns all the publicly functions from this module
		aEditUserForm: aEditUserForm
	} 
});