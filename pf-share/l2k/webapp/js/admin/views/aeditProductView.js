define(['jquery',
    'backbone',
    'underscore',
    'js/admin/forms/aEditProductForm',
    'js/utils/jsonUtils'
    ], function($, Backbone, _, aEditProductForm, Utils) {
  "use strict";

		var aeditProductView = Backbone.View.extend({
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
					type:'GET',
						async: false, // Set to pass the form ob
						url: contextUrl2+'/admin/products/getProductByName?productname='+this.name,
						success:function(message){
								// Convert the message json into flat format
								message = Utils.flatJSON(message)
								var temp = new aEditProductForm.aEditProductForm({data:message})
								temp.fields.productName.editor.$el.attr('disabled', true)
								that.form =  temp// Render form on success
							},
							error:function(message){
							}
						})
				return this
			}


		})

return {
	aeditProductView: aeditProductView
}
})