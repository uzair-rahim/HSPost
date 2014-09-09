define([
		"backbone",
		"utils"
	],
	function(Backbone, Utils){
		var Network = Backbone.Model.extend({

			initialize : function(options){
				console.log("Network model initialized...");
			},

			urlRoot : function(){
				return Utils.GetURL("/services/rest/network");
			},

			url : function(){
				var url = this.urlRoot();
				return url;
			},

			getAllConnections : function(guid,callback){
				var that = this;
				var url = this.urlRoot() + "/" + guid;
				$.ajax({
					type: "GET",
					url : url,
					success : function(response){
						callback(response);
					},
					error : function(){
						console.log("Error fetching connections");
					}
				});
			}
		
		});

		return Network;
	}
);