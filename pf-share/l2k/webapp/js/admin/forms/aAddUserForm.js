define(['js/admin/models/ausersModel',
        'text!js/admin/tpl/addUser.tpl',
        'jquery',
	'backbone',
	'underscore',
	'forms'
	],
	function(ausersModel,Template,$,Backbone,_){

		var user = new ausersModel.ausersModel();
		var aAddUserForm = Backbone.Form.extend({
				template: _.template(Template),
				schema: user.schema,
			    templateData: {heading: 'Add new user'}
			})



	return { // Returns all the publicly functions from this module
		aAddUserForm: aAddUserForm
	}
});