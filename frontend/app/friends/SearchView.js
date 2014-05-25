FbFriends.SearchView = Backbone.View.extend({
	events: {
		'keyup #search-query': 'search',
		'click #sort-by-name': 'sortByName',
		'click #sort-by-birthdate': 'sortByBirthday',
		'click #sort-toggle-order' : 'sortToggleOrder'
	},
	initialize: function(options) {
		_.extend(this, options);
	},
	search: function(event) {
		this.friends.filterByFullname(event.target.value);
	},
	sortByName: function(event) {
		this.friends.sortByAttribute('first_name');
		this.sortButtonHighlight(event.target);
	},
	sortByBirthday: function(event) {
		this.friends.sortByAttribute('birthday_date');
		this.sortButtonHighlight(event.target);
	},
	sortToggleOrder: function() {
		this.friends.sortToggleOrder();
	},
	sortButtonHighlight: function(element) {
		$('#sort-panel .button').removeClass('highlighted');
		$(event.target).addClass('highlighted');
	}
});
