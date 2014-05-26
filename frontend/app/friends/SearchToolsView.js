FbFriends.SearchToolsView = Backbone.View.extend({
	events: {
		'keyup #search-query': 'search',
		'click #sort-by-name': 'sortByName',
		'click #sort-by-birthdate': 'sortByBirthday',
		'click #sort-by-location' : 'sortByLocation',
		'click #sort-toggle-order' : 'sortToggleOrder'
	},
	render: function() {
		this.$el.html(
			this.tmpl()
		);
	},
	initialize: function(options) {
		_.extend(this, options || {});
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
	sortByLocation: function(event) {
		this.friends.sortByAttribute('current_location.city');
		this.sortButtonHighlight(event.target);
	},
	sortToggleOrder: function(event) {
		this.friends.sortToggleOrder();
		$(event.currentTarget).find('i')
				.removeClass('fa-sort-alpha-desc fa-sort-alpha-asc')
				.addClass(this.friends.sortOrder === this.friends.SORT_ORDER_ASC ? 'fa-sort-alpha-asc' : 'fa-sort-alpha-desc');
	},
	sortButtonHighlight: function(element) {
		$('#sort-panel .button').removeClass('selected');
		$(element).addClass('selected');
	}
});
