define([
		"jquery",
		"app",
		"utils",
		"marionette",
		"hbs!/HSPost/templates/template-view-login",
		"../models/model-authenticate"
	],
	function($, App, Utils, Marionette, Template, Authenticate){
	"use strict";

	var ViewLogin = Marionette.ItemView.extend({
		tagName : "div",
		className : "portal-form-container",
		template: Template,
		events : {
			"click #login" : "login"
		},

		initialize : function(){
			_.bindAll.apply(_, [this].concat(_.functions(this)));
			console.log("Login view initialized...");
		},

		login : function(){

			var formEmail = $("#login-email").val();
			var formPassword = $("#login-password").val();

			var credentials = {
				email	 : formEmail,
				password : formPassword
			}

			var options = {
				success : function(){
					App.session.set({logged : true});
					App.router.navigate("jobs", true);
				},
				error : function(model, errors){
					console.log(errors.responseText);
				}
			}

			var auth = new Authenticate();
			auth.set(credentials, {validate:true});
			
			if(auth.validationError){
				console.log("There are errors");
			}else{
				//auth.fetch(options);
				App.session.set({
					logged 		: true,
					verified	: true,
					guid		: "1234-ABCD-5678-EFGH",
					firstname	: "Uzair",
					lastname	: "Rahim",
					email		: "uzair.rahim@hotschedules.com",
					employers	: ["9876-HIJK-5432-LMNO"],
					role		: ["user", "employerAdmin", "support"]
				});

				App.router.navigate("jobs", true);
			}

		},

		serializeData : function(){
			var jsonObject = new Object();
			return jsonObject;
		}
		
	});

	return ViewLogin;
});