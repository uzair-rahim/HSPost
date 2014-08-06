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
				// If the user session cookie does not exist create a new user session cookie with default values
				if(!this.checkUserSession()){
					this.createUserSession();
				}else{
				// If the user session cookie is present set the model attributes to cookie's values
					var existingCookie = JSON.parse($.cookie("HSPostUserSession"));
					this.set(existingCookie);
				}

				var HSPostUserSession = $.cookie("HSPostUserSession");
				return JSON.parse(HSPostUserSession);
			},

			updateUserSession : function(){
				var changes = this.changed;
				var session = this.attributes;

				for(var key in session){
					if(typeof(changes[key]) === "undefined"){
						changes[key] = session[key];
					}
				}

				this.createUserSession(changes);
			},

			stateChanged : function(){
				this.trigger("stateChange", this.changed.logged);
			}

		});

		return Session;
	}
);