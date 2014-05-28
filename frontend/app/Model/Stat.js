'use strict';

FbFriends.Model.Stat = Backbone.Model.extend({
	build: function (container, tmplHTML) {
		this.set('view', new FbFriends.View.Charts[this.get('type') + 'View']({
			el: container,
			tmpl: _.template(tmplHTML),
			title: this.get('title')
		}));
		this.get('friends').on('reset', this.process, this);
	},
	process: function(coll) {
		this.update(this.calcStat(coll));
	},
	calcStat: function(coll) {
		throw 'Not implemented !';
	},
	update: function(data) {
		this.get('view').update(data);
	}
});
