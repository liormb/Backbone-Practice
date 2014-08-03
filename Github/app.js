
// Github Application

var Github = (function(){

	var App = {
		Models: {},
		Collections: {},
		Views: {},
		Templates: {}
	};

	var obj = {}; /* debug */

	// User Model
	App.Models.User = Backbone.Model.extend({
		urlRoot: "https://api.github.com/users"
	});

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
		initialize: function(){
			this.model.on('change', this.render, this);
		},
		events: {
			'click .edit': 'editUser',
			'click .delete': 'deleteUser'
		},
		editUser: function(){
			var name = prompt("Please enter a new name", this.model.get('login'));
			this.model.set('login', name);
		},
		deleteUser: function(){
			this.model.destroy();
			this.$el.remove();
		},
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
			this.collection = new App.Collections.Users();
			this.collection.fetch().done(function(){
				var form = new App.Views.Form({ collection: self.collection });
				$('#github').append( self.render().el );
				obj.users = self.collection; /* debug */
				obj.form = form;             /* debug */
			});
			this.collection.on('add', this.addUser, this);
		},
		render: function(){
			this.collection.each(this.addUser, this);
			return this;
		},
		addUser: function(user){
			var userView = new App.Views.User({ model: user });
			this.$el.append( userView.render().el );
			obj.userView = userView; /* debug */
		}
	});

	// Form View
	App.Views.Form = Backbone.View.extend({
		el: '#form',
		events: {
			'submit': 'submit'
		},
		submit: function(event){
			event.preventDefault();
			var $target = $(event.currentTarget).find('input[type=text]');
			var username = $target.val();

			var self = this;
			var user = new App.Models.User({ id: username });
			user.fetch({
				success: function(d){
					self.collection.add(user);
				},
				error: function(d){
					alert("The username: " + username + " doesn't exist. Try a different username");
				}
			});

			$target.val('');
		}
	});

	// Routes
	App.Router = Backbone.Router.extend({
		initialize: function(){
			var usersView = new App.Views.Users();
			obj.usersView = usersView; /* debug */
		},
		routes: {
			"": "defaultRoute"
		},
		defaultRoute: function(){
			console.log("Home Page");
		}
	});

	// Initialize Application
	var Github = function(){
		var router = new App.Router();
		Backbone.history.start();
		obj.router = router; /* debug */
		return obj;
	}

	return new Github();
})();