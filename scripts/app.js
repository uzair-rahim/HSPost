define([
		"jquery",
		"jquerycookie",
		"underscore",
		"utils",
		"backbone",
		"wreqr",
		"marionette",
		"Handlebars",
		"../scripts/models/model-session",
		"../scripts/layouts/layout-app",
		"../scripts/views/view-menu"
	],
	function($, Cookie, _, Utils, Backbone, Wreqr, Marionette, Handlebars, Session, Layout, Menu){
		"use strict";

		var App = new Marionette.Application();

		// Session
		App.session = new Session();
		App.session.getUserSession();

		// Layout
		App.layout = new Layout({app : App});

		// Menu
		App.menu = new Menu({app : App});
		
		// Add regions to the App
		App.addRegions({
			body : "#hspost"
		});
		
		// Before the App is initialized	
		App.on("initialize:before", function(){
			
		});

		// Add initializer to the App
		App.addInitializer(function(options){
			
		});

		// After the App is initialized
		App.on("initialize:after", function(){
			App.body.show(App.layout);
			App.layout.menu.show(App.menu);
		});

		// On App start
		App.on("start", function(){
			console.log("App initialized...");
			App.startApp();
		});

		// Start the App
		App.startApp = function(){
			if(Backbone.history){
				Backbone.history.start();
			}
		}

		// Application AJAX event handlers

		// AJAX Start
		// The method is called when the first AJAX request begins
		$(document).ajaxStart(function(){
			
		});

		// AJAX Stop
		// The method is called when the ALL AJAX requests have completed
		$(document).ajaxStop(function(){
			
		});

		// AJAX Complete
		// The method is called when an AJAX request completes
		$(document).ajaxComplete(function(){
			
		});

		// AJAX Error
		// The method is called when the first AJAX requests complete with an error
		$(document).ajaxError(function(event, request, settings){
			
		});

		// AJAX Send
		// The method is called before an AJAX request is sent
		$(document).ajaxSend(function(){
			// If user session has expired prompt the user to relogin
			if(App.session.hasExpired()){
				alert("Your session has expired.")
			}
		});

		// AJAX Success
		// The method is called after an AJAX request completes successfully
		$(document).ajaxSuccess(function(){
			
		});

		return App;
	}
);