
// Github Application

var Github = (function(){

	var App = {
		Models: {},
		Collections: {},
		Views: {},
		Templates: {}
	};

	// User Model
	App.Models.User = Backbone.Model.extend({});

	// Users Collection
	App.Collections.Users = Backbone.Collection.extend({
		model: App.Models.User
	});

	// User View
	App.Views.User = Backbone.View.extend({

	});

	// Users View
	App.Views.Users = Backbone.View.extend({

	});

	// Initialize Application
	function init(){

	}

	return App;
})();