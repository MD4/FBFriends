'use strict';

FbFriends.ProfilesView = Backbone.View.extend({
	events: {
		'click .profile-result-row' : 'selectProfile'
	},
	initialize: function(options) {
		_.extend(this, options || {});
		this.friends.on('reset', this.renderProfiles, this);
		this.friends.filterByFullname('');
	},
	renderProfiles: function(coll) {
		var html = coll.map(function(friendModel) {
			var age = friendModel.getAge();
			return this.tmpl({
				name: friendModel.get('first_name'),
				surname: friendModel.get('last_name'),
				hometown: (friendModel.get('hometown_location') || {}).city,
				pictureUrl: friendModel.get('pic_small'),
				age: (!age ? '' : age) + ' ans',
				situation: friendModel.get('relationship_status'),
				uid: friendModel.get('uid')
			});
		}, this).join('\n');

		this.$el.empty().append(html);
	},
	selectProfile: function(event) {
		var uid = event.currentTarget.attributes['data-uid'].value;
		var friendModel = this.friends.findWhere({'uid': uid});
	}
});
