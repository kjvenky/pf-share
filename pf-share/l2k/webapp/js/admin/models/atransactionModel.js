define(['backbone','jquery','underscore'],function(Backbone,$,_){
	"use strict"

	var atransactionModel = Backbone.Model.extend({	
		schema: {
			firstName:{validators: ['required'],editorClass:"form-control"},
			lastName:{validators: [],editorClass:"form-control"},
			phoneNumber:{validators: ['required','email'],editorClass:"form-control"},
			transactionID:{validators: ['required'],editorClass:"form-control"},
			transactionDate:{validators: [],editorClass:"form-control"},
			transactionAmount:{validators: ['required'],editorClass:"form-control"},
			transactionStatus:{validators: ['required'],editorClass:"form-control"},
			transactionTypeName:{validators: ['required'],editorClass:"form-control"}
		}})

	return {
		atransactionModel: atransactionModel
	}
})