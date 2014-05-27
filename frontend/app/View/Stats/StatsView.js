'use strict';

FbFriends.View.StatsView = Backbone.View.extend({
	initialize: function(options) {
		_.extend(this, options || {});
	},
	render: function () {
		this.$el.html(
			this.tmpl()
		);
	}
});
