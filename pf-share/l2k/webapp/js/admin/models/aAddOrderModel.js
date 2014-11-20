define(['backbone','jquery','underscore'],function(Backbone,$,_){
	"use strict"

	var aAddOrderModel = Backbone.Model.extend({	
		default: {
       	 	products: undefined,
        	phoneNumber: undefined,
	        outStandingAmount: undefined,
    	}
	})

	return {
		aAddOrderModel: aAddOrderModel
	}
})

