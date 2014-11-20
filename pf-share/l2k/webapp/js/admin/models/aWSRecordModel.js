define(['backbone','jquery','underscore'],function(Backbone,$,_){
	"use strict"

	var aWSRecordModel = Backbone.Model.extend({	
		schema: {
			qtySent: {validators: ['required'],editorClass:"form-control"},
			qtySold: {validators: ['required'],editorClass:"form-control"},
			sellingPrice: {validators: ['required'],editorClass:"form-control"},
			productName: {type: 'Select',validators: ['required'],editorClass:"form-control",					
			options: function(callback, editor){
				var names = [];					 		
				$.ajax({
					async: false	,
					url: contextUrl+'/admin/products/getAll',
					datatype:'json',
					success:function(data){
						_.each(data,function(model){
							names.push(model.productName)
						})
					}
				})	
				callback(names);
			}},
		}})

	return {
		aWSRecordModel: aWSRecordModel
	}
})