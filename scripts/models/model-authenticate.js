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
				if(attributes.email === ""){
					errors.push({ error : "email", message : "Email address is required"});
				}

				if(attributes.password === ""){
					errors.push({ error : "email", message : "Password is required"});
				}

				return errors.length ? errors : false;

			}

		});

		return Authenticate;
	}
);