define(['js/admin/models/aWSRecordModel',
        'text!js/admin/tpl/aAddWSRecord.tpl',
        'jquery',
	'backbone',
	'underscore',
	'forms'
	],
	function(aWSRecordModel,Template,$,Backbone,_){

		var model = new aWSRecordModel.aWSRecordModel();
		var aAddWSRecordForm = Backbone.Form.extend({
				template: _.template(Template),
				schema: model.schema,
			    templateData: {heading: 'Add Whole Sale Record'}
			})



	return { // Returns all the publicly functions from this module
		aAddWSRecordForm: aAddWSRecordForm
	}
});