'use strict';

FbFriends.View.StatsView = Backbone.View.extend({
	initialize: function (options) {
		_.extend(this, options || {});
	},
	render: function () {
		this.$el.html(
			this.tmpl()
		);
		this.buildStats(this.stats);
		this.renderStats(this.stats);
	},
	buildStats: function(stats) {
		stats.forEach(function(stat){
			var tmplHTML = this.body.find('#tmpl_' + stat.get('type')).html();
			var container = $('<div></div>');
			container
					.attr('id', 'stats-chart-' + stat.get('id'))
					.addClass('stats-chart-container')
					.addClass('stats-' + stat.get('type'));
			this.$el.append(container);
			stat.build(
				container,
				tmplHTML
			);
		}.bind(this));
	},
	renderStats: function (stats) {
		stats.forEach(function(stat){
			var statView = stat.get('view');
			statView.render();
		});
	}
});
