define(['backbone','jquery','underscore'],function(Backbone,$,_){
	"use strict"
	var aproductModel = Backbone.Model.extend({	
		schema: {
			unitName: {type: 'Select',validators: ['required'],editorClass:"form-control",					
			options: function(callback, editor){
				var unitNames = [];					 		
				$.ajax({
					async: false	,
					url: contextUrl+'/admin/products/getProductBaseUnits',
					datatype:'json',
					success:function(data){
						_.each(data,function(model){
							unitNames.push(model.unitName + ' - ' + model.unitValue)
						})
					}
				})
				callback(unitNames);
			}},
		// 	unitValue: {type: 'Select',validators: ['required'],editorClass:"form-control",					
		// 	options: function(callback, editor){
		// 		var unitVals = [];					 		
		// 		$.ajax({
		// 			async: false,
		// 			url: contextUrl+'/admin/products/getProductBaseUnits',
		// 			datatype:'json',
		// 			success:function(data){
		// 				_.each(data,function(model){
		// 					unitVals.push(model.unitValue.toString())
		// 				})
		// 			}
		// 		})	
		// 		callback(_.uniq(unitVals));
		// 	}
		// },
		buyingPrice: {validators: ['required'],editorClass:"form-control"},
		display: {type: 'Select', options: ['False','True'],editorClass:"form-control"},
		grade: {validators: ['required'],editorClass:"form-control"},
		imgUrl: {validators: ['required'],editorClass:"form-control"},
		productPkey: {editorClass:"form-control"},
		productName: {validators: ['required'],editorClass:"form-control"},
		sellingPrice: {validators: ['required'],editorClass:"form-control"},
	}})

return {
	aproductModel: aproductModel
}
})