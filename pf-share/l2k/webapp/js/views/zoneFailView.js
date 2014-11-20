define(
		[ 'jquery', 'backbone', 'underscore', 'text!js/tpl/regSuccess.tpl', ],
		function($, Backbone, _, Template) {

			"use strict"

			var zoneFailView= Backbone.View.extend({
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
							this.$el.html(this.template())
							return this
						}

					})
			return {
				zoneFailView: zoneFailView
			}
		})