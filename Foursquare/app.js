
// Foursquare Application

var Foursquare = (function(){

	var App = {
		Models: {},
		Collections: {},
		Views: {},
		Templates: {}
	};

	// Place Model
	App.Models.Place = Backbone.Model.extend({});

	// Places Collection
	App.Collections.Places = Backbone.Collection.extend({
		model: App.Models.Place,
		url: "https://api.foursquare.com/v2/venues/explore"
	});

	// Place View
	App.Views.Place = Backbone.View.extend({

	});

	// Places View
	App.Views.Places = Backbone.View.extend({});

	// Application Router
	App.Router = Backbone.Router.extend({});

	function Foursquare(){
		var new App.Router();
		return App;
	}

	return new Foursquare();

})();
