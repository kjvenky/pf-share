define(['backbone','jquery','underscore'],function(Backbone,$,_){
	"use strict"

	var ausersModel = Backbone.Model.extend({	
		schema: {
					username:{validators: ['required'],editorClass:"form-control"},
					password:{validators: [],editorClass:"form-control"},
					emailID:{validators: ['required','email'],editorClass:"form-control"},
					firstName:{validators: ['required'],editorClass:"form-control"},
					lastName:{validators: [],editorClass:"form-control"},
					address1:{validators: ['required'],editorClass:"form-control"},
					address2:{validators: ['required'],editorClass:"form-control"},
					address3:{validators: ['required'],editorClass:"form-control"},
					address4:{validators: ['required'],editorClass:"form-control"},
					zoneName:{type: 'Select',editorClass:"form-control",
					 // options: ["Urappakkam","Vandalur","Perungulattur","Tambaram","Tambaram Sanaitorium","Chrompet","Pallavaram","Tirusulam","Minambakkam","Palavanthangal","St Thomas Mount","Guindy","Saidapet","Kottivakkam","Palavakkam","Neelangarai","Injambakkam","Panaiyur","Uthandi","Kanathur","Sirusery","IIT Madras","Adyar","Thiruvanmyur","Perungudi","Kandan CHavadi","Thuraipakkam","Kottivakkam","Muttukaran CHavadi","Karapakkam","Sholinganallur","Semencheri","Kamarajnagar","Navallur","Egattur","Kalipathur","Kannathur","Padur","Sirusery","Kelampakkam","Thiruporur","Mambalam","Others"],editorClass:"form-control"}
					 options: function(callback, editor){
					 		var zoneList = [];					 		
					 		$.ajax({
					 			async: false	,
								url: contextUrl+'/admin/getAllZones',
								datatype:'json',
								success:function(data){
									_.each(data,function(model){
										zoneList.push(model.zoneName)
									})
								}
							})	
       						callback(zoneList);
						}
					 },
					primaryMobile:{validators: ['required'],editorClass:"form-control"},
					secondaryPhone:{validators: [],editorClass:"form-control"},
					landLine:{validators: [],editorClass:"form-control"},
					personTypeName:{type: 'Select',editorClass:"form-control",
						options: function(callback, editor){
					 		var personTypeList = [];					 		
					 		$.ajax({
					 			async: false,
								url: contextUrl+'/admin/getUserTypes',
								datatype:'json',
								success:function(data){
									_.each(data,function(model){
										personTypeList.push(model.personType)
									})
								}
							})	
       						callback(personTypeList);
						}
					},
					bankName:{validators:[],editorClass:"form-control"},
					bankBranch:{validators:[],editorClass:"form-control"},
					bankAccountNumber:{validators:[],editorClass:"form-control"},					
					address5:{validators: []}
		}
	})

	return {
		ausersModel: ausersModel
	}
})