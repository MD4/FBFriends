'use strict';

FbFriends.View.ProfilesView = Backbone.View.extend({
	events: {
		'click .profile-result-row': 'selectProfile'
	},
	initialize: function (options) {
		_.extend(this, options || {});
		this.friends.on('reset', this.renderProfiles, this);
		this.friends.filterByFullname('');
	},
	renderProfiles: function (coll) {
		var html = coll.map(function (friendModel) {
			var age = friendModel.getAge();
			return this.tmpl({
				name: friendModel.get('first_name'),
				surname: friendModel.get('last_name'),
				hometown: (friendModel.get('current_location') || {}).city,
				pictureUrl: friendModel.get('pic_small'),
				age: !age ? '' : (age + ' ans'),
				situation: friendModel.get('relationship_status'),
				uid: friendModel.get('uid')
			});
		}, this).join('\n');

		this.$el.empty().append(html);

		this.trigger('reset:allMarkers');

		coll.forEach(function (friend) {
			this.trigger('create:friendMarker', friend);
		}.bind(this));
	},
	selectProfileByUid: function (uid) {
		var friendModel = this.friends.findWhere({'uid': uid});
		var friendRowEl = this.$el.find('.profile-result-row[data-uid=' + uid + ']');
		
		this.trigger('change:selectedFriend', friendModel);
		
		this.$el.find('.profile-result-row').removeClass('selected');
		friendRowEl.addClass('selected');

		var scrollTo = this.$el.scrollTop() + friendRowEl.position().top - 102;
		this.$el.animate({
			scrollTop: scrollTo
		}, 250);
	},
	selectProfile: function (event) {
		var uid = event.currentTarget.attributes['data-uid'].value;
		this.selectProfileByUid(uid);
	}
});
