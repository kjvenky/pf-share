define(['jquery',
		'backbone',
		'js/admin/models/acouponModel'],function($,Backbone,acouponModel){

	"use strict"

	var acouponsCollection = Backbone.Collection.extend({
		model: acouponModel.acouponModel,
		url: contextUrl+'/admin/coupons/getAllCoupons', 
		initialize: function(){
			// Do nothing
		}
	})

	return {
		acouponsCollection: acouponsCollection
	}
})