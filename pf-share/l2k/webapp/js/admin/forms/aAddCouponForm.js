define(['js/admin/models/acouponModel',
        'text!js/admin/tpl/addCoupon.tpl',
        'jquery',
	'backbone',
	'underscore',
	'forms'
	],
	function(acouponModel,Template,$,Backbone,_){

		var user = new acouponModel.acouponModel();
		var aAddCouponForm = Backbone.Form.extend({
				template: _.template(Template),
				schema: user.schema,
			    templateData: {heading: 'Add new Coupon'}
			})



	return { // Returns all the publicly functions from this module
		aAddCouponForm: aAddCouponForm
	}
});