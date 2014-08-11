define([
		"backbone",
	],
	function(Backbone){
		var Session = Backbone.Model.extend({

			defaults : {
				logged 				: false,
				verified 			: false,
				expired				: false,
				remember 			: false,
				guid				: null,
				firstname			: null,
				lastname			: null,
				email 				: null,
				employers			: null,
				selectedEmployer	: 0,
				roles				: null
			},

			initialize : function(options){
				console.log("Session model initialized...");
				this.on("change", this.updateUserSession);
			},

			// Check to see if the user session cookie is present
			checkUserSession : function(){
				var HSPostUserSession = $.cookie("HSPostUserSession");
				return HSPostUserSession !== undefined;
			},

			// Create a user session cookie
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

			// Remove the user session cookie
			removeUserSession : function(){
				$.removeCookie("HSPostUserSession", { path : "/"});
			},

			// Get user session info
			getUserSession : function(){
				// If the user session cookie does not exist create a new user session cookie with default model values
				if(!this.checkUserSession()){
					this.createUserSession();
				}else{
				// If the user session cookie is present set the model attributes to cookie's values
					var existingCookie = JSON.parse($.cookie("HSPostUserSession"));
					this.set(existingCookie);
				}
				return this.attributes;
			},

			// Update user session info
			updateUserSession : function(){
				
				this.trigger("stateChange", this.changed);

				var changes = this.changed;
				var session = this.attributes;

				for(var key in session){
					if(typeof(changes[key]) === "undefined"){
						changes[key] = session[key];
					}
				}

				this.createUserSession(changes);
			},

			// Helper Methods

			isLoggedIn : function(){
				return this.attributes.logged;
			},

			isVerified : function(){
				return this.attributes.verified;
			},

			hasExpired : function(){
				return this.attributes.expired;
			},

			isRememberMe : function(){
				return this.attributes.remember;
			},

			getGuid : function(){
				return this.attributes.guid;
			},

			getFirstName : function(){
				return this.attributes.firstname;
			},

			getLastName : function(){
				return this.attributes.lastname;
			},

			getFullname : function(){
				return this.attributes.firstname + " " + this.attributes.lastname;
			},

			getEmployers : function(){
				return this.attributes.employers;
			},

			getSelectedEmployer : function(){
				return this.attributes.selectedEmployer;
			},

			getRoles : function(){
				return this.attributes.employers;
			},

			getEmail : function(){
				return this.attributes.email;
			}

		});

		return Session;
	}
);