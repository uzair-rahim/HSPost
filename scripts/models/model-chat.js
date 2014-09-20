define([
	"backbone",
	"utils"
	],
	function(Backbone, Utils){
		var Chat = Backbone.Model.extend({

			urlRoot : function(){
				return Utils.GetURL("/services/rest/chat");
			},
			
			url : function(){
				var url = this.urlRoot();
				return url;
			},

			initialize : function(){
				console.log("Chat model initialized...");
			},

			getUserChatList : function(userGUID,callback){
				var that = this;
				var url = this.urlRoot() + "/user/" + userGUID;
				$.ajax({
					type : "GET",
					url : url,
					success : function(response){
						callback(response);
					}
				});
			},

			getEmployerChatList : function(employerGUID,callback){
				var that = this;
				var url = this.urlRoot() + "/employer/" + employerGUID;
				$.ajax({
					type : "GET",
					url : url,
					success : function(response){
						callback(response);
					}
				});
			},

			getUserChat : function(chatGUID,userGUID,callback){
				var that = this;
				var url = this.urlRoot() + "/" + chatGUID + "/user/" + userGUID;
				$.ajax({
					type : "GET",
					url : url,
					success : function(response){
						callback(response);
					}
				});
			},

			getEmployerChat : function(chatGUID,employerGUID,callback){
				var that = this;
				var url = this.urlRoot() + "/" + chatGUID + "/user/" + employerGUID;
				$.ajax({
					type : "GET",
					url : url,
					success : function(response){
						callback(response);
					}
				});
			},

			getChatGUID : function(){
				return this.attributes.guid;
			},

			getJobName : function(){
				return this.attributes.jobPosting.jobName;
			},

			getEmployerName : function(){
				return this.attributes.jobPosting.employer.name;
			}

		});

		return Chat;
	}
);