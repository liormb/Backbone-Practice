
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
		tagName: 'li',
		className: 'place',
		template: _.template( $('#place-template').html() ),
		render: function(){
			this.$el.html( this.template(this.model.toJSON()) );
			return this;
		}
	});

	// Places View
	App.Views.Places = Backbone.View.extend({
		tagName: 'ul',
		className: 'places',
		render: function(){
			this.collection.each( this.addPlace, this );
			return this;
		},
		addPlace: function(place){
			var placeView = new App.Views.Place({ model: place });
			this.$el.append( placeView.render().el );
		}
	});

	// Application Router
	App.Router = Backbone.Router.extend({
		initialize: function(){
			var places = new App.Collections.Places();
			places.fetch({
				data: {
	        client_id: config.CLIENT_ID,
	        client_secret: config.CLIENT_SECRET,
	        v: config.VERSION,
	        near: "New York",
	        venuePhotos: '1'
				},
				dataType: 'jsonp',
				success: function(d){
					var response = places.models[0].get('response').groups[0].items;
					var collection = new App.Collections.Places(response);
					var placesView = new App.Views.Places({ collection: collection });
					$('#foursquare').append( placesView.render().el );
					test = collection;
				},
				error: function(d){
					console.log("Can't fetch data from server");
				}
			});
		},
		routes: {
			"": "home"
		},
		home: function(){
			console.log("Home Page");
		}
	});

	function Foursquare(){
		var router = new App.Router();
		Backbone.history.start();

		return App;
	}

	return new Foursquare();

})();
