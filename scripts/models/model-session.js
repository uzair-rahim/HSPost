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
				this.on("change:expired", this.sessionExpired);
			},

			// Check to see if the user data is present
			checkUserSession : function(){
				return localStorage.getItem("HSPostUserSession") === null;
			},

			// Create a user data local storage key
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

				localStorage.setItem("HSPostUserSession", JSON.stringify(options));
			},

			// Remove the user data local storage key
			removeUserSession : function(){
				localStorage.removeItem("HSPostUserSession");
			},

			// Get user data info
			getUserSession : function(){
				// If the user data local storage key does not exist create a new user data local storage key with default model values
				if(this.checkUserSession()){
					this.createUserSession();
				}else{
				// If the user data local storage key is present set the model attributes to keys's value
					var existingData = JSON.parse(localStorage.getItem("HSPostUserSession"));
					this.set(existingData);
				}
				return this.attributes;
			},

			// Update user data info
			updateUserSession : function(){
				this.trigger("stateChanged");
				var changes = this.attributes;
				this.createUserSession(changes);
			},

			// Trigger session expired
			sessionExpired : function(){
				this.trigger("sessionExpired", this.changed);
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
				return this.attributes.roles;
			},

			getEmail : function(){
				return this.attributes.email;
			}

		});

		return Session;
	}
);