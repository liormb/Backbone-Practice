
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
		model: App.Models.User,
		url: "https://api.github.com/users",
		initialize: function(){
			console.log("Github users initialize");
		}
	});

	// User View
	App.Views.User = Backbone.View.extend({
		tagName: 'li',
		className: 'user',
		template: _.template( $('#user-template').html() ),
		render: function(){
			this.$el.html( this.template(this.model.toJSON()) );
			return this;
		}
	});

	// Users View
	App.Views.Users = Backbone.View.extend({
		tagName: 'ul',
		className: 'users',
		initialize: function(){
			var self = this;
			this.collection.fetch().done(function(){
				$('#github').append( self.render().el );
			});
		},
		render: function(){
			this.collection.each(this.addUser, this);
			return this;
		},
		addUser: function(user){
			var userView = new App.Views.User({ model: user });
			this.$el.append( userView.render().el );
		}
	});

	// Routes
	App.Router = Backbone.Router.extend({
		routes: {
			"": "defaultRoute"
		},
		defaultRoute: function(){
			console.log("Home Page");
		}
	});

	// Initialize Application
	function init(){
		var appRouter = new App.Router();
		var users = new App.Collections.Users();
		var usersView = new App.Views.Users({ collection: users });
		Backbone.history.start();
	}

	init();

	return App;
})();