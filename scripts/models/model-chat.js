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

			getUserChatList : function(userGUID,archived,callback){
				var that = this;
				var url = this.urlRoot() + "/user/" + userGUID + "?archived=" + archived;
				$.ajax({
					type : "GET",
					url : url,
					success : function(response){
						callback(response);
					}
				});
			},

			getEmployerChatList : function(employerGUID,archived,callback){
				var that = this;
				var url = this.urlRoot() + "/employer/" + employerGUID + "?archived=" + archived;;
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
				var url = this.urlRoot() + "/" + chatGUID + "/employer/" + employerGUID;
				$.ajax({
					type : "GET",
					url : url,
					success : function(response){
						callback(response);
					}
				});
			},

			updateChatMessageAsSeenByEmployer : function(chatGUID,callback){
				var that = this;
				var url = this.urlRoot() + "/" + chatGUID + "/messages/employer/seen";
				$.ajax({
					type : "PUT",
					url : url,
					asyn : false,
					success : function(response){
						callback(response);
					},
					error : function(){
						console.log("Error marking chat messages as seen by employer");
					}
				});
			},

			updateChatMessageAsSeenByUser : function(chatGUID,callback){
				var that = this;
				var url = this.urlRoot() + "/" + chatGUID + "/messages/candidate/seen";
				$.ajax({
					type : "PUT",
					url : url,
					asyn : false,
					success : function(response){
						callback(response);
					},
					error : function(){
						console.log("Error marking chat messages as seen by user");
					}
				});
			},

			addChat : function(chat,chatGUID,callback){
				var that = this;
				var url = this.urlRoot() + "/"+ chatGUID + "/message";
				$.ajax({
					type : "POST",
					url : url,
					contentType : "application/json",
					data : JSON.stringify(chat),
					async : false,
					success : function(response){
						callback(response);
					},
					error : function(){
						console.log("Error adding to chat");
					}
				});
			},

			getChatGUID : function(){
				return this.attributes.guid;
			},

			getJobName : function(){
				return this.attributes.jobPosting.jobName;
			},

			getUserFullName : function(){
				var fullname = "";
				var participants = this.attributes.participants;
					$.each(participants,function(){
						if(this.user !== null){
							fullname = this.user.firstname + " " + this.user.lastname;
						}
					});
				return fullname;	
			},

			getEmployerName : function(){
				var employerName = "";
				var participants = this.attributes.participants;
					$.each(participants,function(){
						if(this.employer !== null){
							employerName = this.employer.name;
						}
					});
				return employerName;	
			}

		});

		return Chat;
	}
);