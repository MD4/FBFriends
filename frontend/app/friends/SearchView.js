FbFriends.SearchView = Backbone.View.extend({
	initialize: function(options) {
		_.extend(this, options || {});
	},
	render: function () {
		this.searchToolsView.render();
		this.profilesView.render();
	}
});
