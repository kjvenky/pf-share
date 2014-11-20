define(['backbone','jquery','underscore'],function(Backbone,$,_){
	"use strict"

	var aordersModel = Backbone.Model.extend({	
		schema: {
					orderPkey:{validators: ['required'],editorClass:"form-control"},
					orderStatus:{validators: ['required'],editorClass:"form-control"},
		}
	})

	return {
		aordersModel: aordersModel
	}
})