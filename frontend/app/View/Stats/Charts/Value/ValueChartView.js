'use strict';

FbFriends.View.Charts.ValueChartView = Backbone.View.extend({
	initialize: function(options) {
		_.extend(this, options || {});
		this.graph = {};
	},
	render: function() {
		this.first = true;
		this.$el.html(
			this.tmpl({
				title: this.title
			})
		);
	},
	update: function(data) {
		console.log(this.$el.find('stats-count-value'));
		this.$el.find('.stats-count-value').text(data);
	}

});
