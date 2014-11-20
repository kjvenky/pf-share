define(['backbone','jquery','underscore'],function(Backbone,$,_){
	"use strict"

	var acouponModel = Backbone.Model.extend({	
		schema: {
			couponCode: {validators: ['required'],editorClass:"form-control"},
			hitCounter: {validators: ['required'],editorClass:"form-control"},
			startDate: {validators: ['required'],editorClass:"form-control"},
			endDate: {validators: ['required'],editorClass:"form-control"},
			discount: {validators: ['required'],editorClass:"form-control"},
			mediaName: {validators: ['required'],editorClass:"form-control"}
		}})

	return {
		acouponModel: acouponModel
	}
})