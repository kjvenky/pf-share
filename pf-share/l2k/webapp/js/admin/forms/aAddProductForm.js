define(['js/admin/models/aproductModel',
        'text!js/admin/tpl/addProduct.tpl',
        'jquery',
	'backbone',
	'underscore',
	'forms'
	],
	function(aproductModel,Template,$,Backbone,_){

		var user = new aproductModel.aproductModel();
		var aAddProductForm = Backbone.Form.extend({
				template: _.template(Template),
				schema: user.schema,
			    templateData: {heading: 'Add new product'}
			})

	return { // Returns all the publicly functions from this module
		aAddProductForm: aAddProductForm
	}
});