define([
		"jquery",
		"app",
		"utils",
		"marionette",
		"hbs!/HSPost/templates/template-view-network",
		"../views/view-network-list",
	],
	function($, App, Utils, Marionette, Template, ViewNetworkList){
	"use strict";

	var ViewNetwork = Marionette.ItemView.extend({
		tagName : "div",
		className : "content",
		template: Template,
		events : {
			
		},

		initialize : function(){
			_.bindAll.apply(_, [this].concat(_.functions(this)));
			console.log("Network view initialized...");
		},

		onShow : function(){
			var container = this.el;
			var network = this.options.model;
			if(this.hasNetwork()){
				$.each(network,function(key){
					var networkList = new Object();
						networkList.name = key.charAt(0).toUpperCase() + key.slice(1)
						networkList.users = this;
				var networkList = new ViewNetworkList({model : networkList});
					$(container).append(networkList.render().el);
				});
			}
		},

		hasNetwork : function(){
			return this.options.models !== 0;
		},

		serializeData : function(){
			var jsonObject = new Object();
				jsonObject.template = new Object();
				jsonObject.template.title = "Network"
				jsonObject.hasNetwork = this.hasNetwork();
			return jsonObject;
		}
		
	});

	return ViewNetwork;
});