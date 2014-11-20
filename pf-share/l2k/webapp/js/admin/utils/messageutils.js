define(['jquery',
	'backbone',
	'underscore'],function($,Backbone,_){

		"use strict";
		var topMessages = function (message,className){
			$('#topMessages').html('<div>'+message+'</div>').addClass(className).hide().slideDown(300)

			setTimeout(function(){
				$('#topMessages').slideUp('slow').html('')
			},1800)
		}

		var webMaskShow = function (){$('#webMask').show()}
		var webMaskHide = function (){$('#webMask').hide()}

	return {
		topMessages: topMessages,
		webMaskHide: webMaskHide,
		webMaskShow: webMaskShow
	}
})