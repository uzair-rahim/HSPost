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
				Utils.ShowToast({message : auth.validationError[0].message});
			}else{
				//auth.fetch(options);
				App.session.set({
					logged 		: true,
					verified	: true,
					remember 	: $("#remember-me").prop("checked"),
					guid		: "1234-ABCD-5678-EFGH",
					firstname	: "Uzair",
					lastname	: "Rahim",
					email		: "uzair.rahim@hotschedules.com",
					employers	: [
						{
							guid : "9876-HIJK-5432-LMNO",
							name : "McDonalds North Lamar",
							logo : "http://greedforilm.com/wp-content/uploads/2013/03/mcdonalds.jpeg"
						},
						{
							guid : "J92H-7H4F-88HI-GH4G",
							name : "McDonalds South Lamar",
							logo : null
						}],
					selectedEmployer : 0,
					roles		: ["user", "employerAdmin", "support"]
				});

				App.router.controller.redirectOnLogin();
			}

		},

		serializeData : function(){
			var jsonObject = new Object();
			return jsonObject;
		}
		
	});

	return ViewLogin;
});