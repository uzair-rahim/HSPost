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

		onShow : function(){
			if(App.session.isRememberMe()){
				$("#login-email").val(App.session.getEmail());
				$("#remember-me").prop("checked", true);
			}
		},

		login : function(){

			var formEmail = $("#login-email").val();
			var formPassword = $("#login-password").val();

			var credentials = {
				emailaddress : formEmail,
				password 	 : formPassword
			}

			var options = {
				success : function(response){
					var user = new Object();
						user = auth.getUser();
						user.logged = true;
						user.expired = false;
						user.remember = $("#remember-me").prop("checked");
						
					App.session.set(user);
					App.router.controller.redirectOnLogin();
				},
				error : function(model, errors){
					if(typeof(errors.responseJSON) !== "undefined"){
						var error = errors.responseJSON;
						Utils.ShowToast({message : error.errorMsg});
					}
				}
			}

			var auth = new Authenticate();
			auth.set(credentials, {validate:true});
			
			if(auth.validationError){
				Utils.ShowToast({message : auth.validationError[0].message});
			}else{
				auth.save(credentials, options);
			}

		},

		serializeData : function(){
			var jsonObject = new Object();
			return jsonObject;
		}
		
	});

	return ViewLogin;
});