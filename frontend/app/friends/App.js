'use strict';

FbFriends.App = Backbone.View.extend({
	friends: null,
	initialize: function (options) {
		_.extend(this, options || {});
		this.render();
	},
	render: function () {
		this.searchView.render();
		this.mapView.render();
	}
});