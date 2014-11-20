define(['jquery',
	'backbone',
	'underscore',
	'js/admin/forms/aEditUserForm',
	'js/utils/jsonUtils'
	],function($,Backbone,_,aEditUserForm, Utils){

		"use strict"

		var aeditUserView = Backbone.View.extend({
			initialize:function(options){
				this.name =  options.name || undefined // What to do if undefined
				this.form = options.form || undefined 
				_.bindAll(this,'render')
				this.render() // Render on initialization to define the form variable
			},

			render:function(){
				var that = this;
				// Get data and cteate the form
				$.ajax({	
					type:'POST',
						async: false, // Set to pass the form ob
						url: contextUrl2+'/admin/persons/getPersonByUsername?username='+this.name,
						success:function(message){
								// Convert the message json into flat format
								message = Utils.flatJSON(message)
								that.form = new aEditUserForm.aEditUserForm({data:message}) // Render form on success
							},
							error:function(message){
							}
						})
				return this
			}


		})

return {
	aeditUserView: aeditUserView
}
})