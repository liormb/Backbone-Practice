
// Backbone Contacts Application

var Contacts = (function(){

	var App = {
		Models: {},
		Collections: {},
		Views: {}
	};

	// Return a random color
	function randomColor(){
		var color = "rgb(";
		for (var i=0; i < 3; i++){
			color += Math.floor(Math.random() * 256);
			color += (i < 2) ? "," : ")";
		}
		return color;
	}

	// Person Model
	App.Models.Person = Backbone.Model.extend({
		defaults: {
			firstName: "John",
			lastName: "Smith"
		}
	});

	// People Collection
	App.Collections.People = Backbone.Collection.extend({
		model: App.Models.Person
	});

	// Person View
	App.Views.Person = Backbone.View.extend({
		tagName: 'li',
		className: 'person',
		events: {
			'click .edit'  : 'editPerson',
			'click .delete': 'deletePerson',
			'dblclick': 'changeBGColor'
		},
		initialize: function(){
			this.model.on('change', this.render, this);
		},
		template: _.template( $('#person').html() ),
		render: function(){
			this.$el.html( this.template(this.model.toJSON()) );
			return this;
		},
		editPerson: function(){
			var input = prompt("Please enter the new name", this.model.get('firstName') + " " + this.model.get('lastName')).split(' ');
			this.model.set('firstName', input[0]);
			this.model.set('lastName', input[1]);
		},
		deletePerson: function(){
			this.$el.remove();
			this.model.destroy();
		},
		changeBGColor: function(){
			this.$el.css({ backgroundColor: randomColor, color: 'white' });
		}
	});

	// People View
	App.Views.People = Backbone.View.extend({
		tagName: 'ul',
		className: 'people',
		initialize: function(){
			this.collection.on('add', this.addPerson, this)
		},
		render: function(){
			this.collection.each(this.addPerson, this);
			return this;
		},
		addPerson: function(person){
			var personView = new App.Views.Person({ model: person });
			this.$el.append( personView.render().el );
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
			var input = $target.val().split(' ');
			var person = new App.Models.Person({ firstName: input[0], lastName: input[1] });
			this.collection.add(person);
			$target.val('');
		}
	});

	// Github
	App.Models.Github = Backbone.Model.extend({
		urlRoot: 'https://api.github.com/users',
		initialize: function(){
			this.fetch({
				success: function(users){
					console.dir(users);
				}
			});
		}
	});Backbone

	// Page Router
	App.Router = Backbone.Router.extend({
		routes: {
			'': 'home',
			'page1': 'page1',
			'page2': 'page2',
			'page3': 'page3'
		},
		home: function(){
			$(document.body).css({backgroundColor: 'rgb(240,240,240)'});
		},
		page1: function(){
			$(document.body).css({backgroundColor: 'rgb(255,0,0)'});
		},
		page2: function(){
			$(document.body).css({backgroundColor: 'rgb(0,255,0)'});
		},
		page3: function(){
			$(document.body).css({backgroundColor: 'rgb(0,0,255)'});
		}
	});

	// Initialize
	function init(){
		var people = new App.Collections.People([
			{ firstName: "Lior"    , lastName: "Elrom" },
			{ firstName: "Tim"     , lastName: "Elrom" },
			{ firstName: "Michelle", lastName: "Elrom" }
		]);

		var formView   = new App.Views.Form({ collection: people });
		var pageRouter = new App.Router();
		var peopleView = new App.Views.People({ collection: people });
		$('#contacts').append( peopleView.render().el );

		var github = new App.Models.Github();

		Backbone.history.start();
	}

	init();

	return App;

})();
