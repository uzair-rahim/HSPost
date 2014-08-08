require.config({
	urlArgs : "bust=" + (new Date()).getTime(),
	paths: {
		jquery			: "../libraries/jquery.1.10",
		jqueryui		: "../libraries/jquery.ui.1.10",
		jquerycookie	: "../libraries/jquery.cookie",
		underscore		: "../libraries/underscore",
		backbone		: "../libraries/backbone",
		wreqr			: "../libraries/backbone.wreqr",
		marionette		: "../libraries/backbone.marionette",
		Handlebars		: "../libraries/handlebars",
		hbs 			: "../libraries/hbs",
		i18nprecompile 	: "../libraries/i18nprecompile",
		json2 			: "../libraries/json2",
		app 			: "../scripts/app",
		utils			: "../scripts/utils",
		approuter 		: "../scripts/routers/app-router",
		appcontroller 	: "../scripts/controllers/app-controller"
	},
	shim: {

		jqueryui : {
			exports: "$",
			deps:["jquery"]
		},

		jquerycookie : {
			deps:["jquery"]
		},

		json2 : {
			deps:["jquery"]
		},
		
		backbone:{
			deps:["jquery", "underscore"],
			exports: "Backbone"
		},

		wreqr:{
			deps:["backbone"],
			exports: "Wreqr"
		},

		marionette:{
			deps:["backbone", "wreqr"],
			exports: "Marionette"
		},

		Handlebars:{
			deps:[],
			exports: "Handlebars"
		}
	},

	hbs:{
		templateExtension: "tpl",
		disableI18n: true,
		helperPathCallback: function(name){
			return "../templates/helpers/" + name + ".js";
		}
	}
});

require(["app", "approuter"],function(App, ApplicationRouter){
	var options = {};
	var router = new ApplicationRouter();
	
	App.router = router;
		router.on("route", function(){
			// if user is logged in and verified switch the layout to app mode
			if(App.session.isLoggedIn() && App.session.isVerified()){
				App.layout.toggleLayout("app");
			// if user is not logged in or verified switch the layout to portal mode
			}else{
				App.layout.toggleLayout("portal");
			}
		});

	App.start(options);
});