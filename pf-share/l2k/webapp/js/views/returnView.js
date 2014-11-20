define(
		[ 'jquery', 'backbone', 'underscore', 'text!js/tpl/return.tpl', ],
		function($, Backbone, _, Template) {

			"use strict"

			var returnView= Backbone.View.extend({
						template : _.template(Template),
						initialize : function() {
							_.bindAll(this, 'render', 'closemessages');
							this.render(); // Renders the requried view
							this.delegateEvents();
						},

						events : { // http://stackoverflow.com/questions/12433485/backbone-events-not-binding-to-dom-element
							"click a#closemessage" : "closemessages"
						},

						closemessages : function() {
							$('#messages').slideUp(function() {
								$(this).html();
							})
						},

						render : function() {
							return this.$el.html(this.template())
						}

					})
			return {
				returnView: returnView
			}
		})