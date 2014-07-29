define([
		"backbone",
	],
	function(Backbone){
		var Session = Backbone.Model.extend({

			defaults : {
				logged 		: false,
				verified	: false,
				guid		: null,
				firstname	: null,
				lastname	: null,
				email		: null,
				employers	: null,
				role		: null
			},

			initialize : function(options){
				console.log("Session model initialized...");
				this.on("change", this.updateUserSession);
				this.on("change:logged", this.stateChanged);
			},

			checkUserSession : function(){
				var HSPostUserSession = $.cookie("HSPostUserSession");
				return HSPostUserSession !== undefined;
			},

			createUserSession : function(options){
				var defaults = this.defaults;

				if(typeof(options) === "undefined"){
					options = {};
				}

				for(var key in defaults){
					if(typeof(options[key]) === "undefined"){
						options[key] = defaults[key];
					}
				}

				$.cookie("HSPostUserSession", JSON.stringify(options), { path : "/"});
			},

			removeUserSession : function(){
				$.removeCookie("HSPostUserSession", { path : "/"});
			},

			getUserSession : function(){
				if(!this.checkUserSession()){
					this.createUserSession();
				}

				var HSPostUserSession = $.cookie("HSPostUserSession");
				return JSON.parse(HSPostUserSession);
			},

			updateUserSession : function(){
				this.createUserSession(this.changed);
			},

			stateChanged : function(){
				this.trigger("stateChange", this.changed.logged);
			}

		});

		return Session;
	}
);