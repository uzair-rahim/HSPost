define([
		"backbone",
		"utils"
	],
	function(Backbone, Utils){
		var Employer = Backbone.Model.extend({

			defaults : {
				id			: null,
				guid		: null,
				name		: null,
				location	: null,
				phone		: null,
				url 		: null,
				email 		: null,
				logo		: null,
				about		: null,
				ppa 		: null,
				hours		: null,
				preferences	: null,
				externaIDs	: null,
				admins		: null,
				currency	: null,
				claimed		: null
			},

			urlRoot : function(){
				return Utils.GetURL("/services/rest/employer");
			},

			url : function(){
				var url = this.urlRoot();
				return url;
			},

			initialize : function(options){
				console.log("Employer model initialized...");
			}
		
		});

		return Employer;
	}
);