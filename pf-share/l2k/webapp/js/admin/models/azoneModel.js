define(['backbone','jquery','underscore'],function(Backbone,$,_){
	"use strict"

	var azoneModel = Backbone.Model.extend({	
		schema: {
			zoneName: {validators: ['required'],editorClass:"form-control"},
		}})

	return {
		azoneModel: azoneModel
	}
})