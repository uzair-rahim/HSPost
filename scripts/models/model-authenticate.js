define([
		"backbone",
		"utils"
	],
	function(Backbone, Utils){
		var Authenticate = Backbone.Model.extend({

			defaults : {
				email 	 : null,
				password : null
			},

			urlRoot : function(){
				return Utils.GetURL("/services/rest/auth/login");
			},

			url : function(){
				var url = this.urlRoot() + "/" + this.attributes.email + "/" + this.attributes.password;
				return url;
			},

			initialize : function(options){
				console.log("Authenticate model initialized...");
			},

			validate : function(attributes){
				var errors = [];
				var emailRegExp = Utils.RegularExpressions.email;

				if(attributes.email === "" || attributes.password === ""){
					errors.push({ error : "required", message : "Email address and password are required"});
				}

				if(!emailRegExp.test(attributes.email)){
					errors.push({ error : "email", message : "Invalid email address"});
				}

				return errors.length ? errors : false;

			}

		});

		return Authenticate;
	}
);