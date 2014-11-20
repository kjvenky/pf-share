define(['js/admin/models/ainventoryRefillRecordModel',
        'text!js/admin/tpl/addProduct.tpl',
        'jquery',
	'backbone',
	'underscore',
	'forms'
	],
	function(ainventoryRefillRecordModel,Template,$,Backbone,_){

		var form = new ainventoryRefillRecordModel.ainventoryRefillRecordModel();
		var aAddFarmerDeliveryRecordForm = Backbone.Form.extend({
				template: _.template(Template),
				schema: form.schema,
			    templateData: {heading: 'Add new farmer delivery record'}
			})



	return { // Returns all the publicly functions from this module
		aAddFarmerDeliveryRecordForm: aAddFarmerDeliveryRecordForm
	}
});