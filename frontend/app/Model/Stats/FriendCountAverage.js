'use strict';

FbFriends.Model.Stats.FriendCountAverage = FbFriends.Model.Stat.extend({
	initialize: function() {
		this.set('type', 'ValueChart');
		this.set('id', 'FriendCountAverage');
		this.set('title', 'Friend Count Average');
	},
	calcStat: function(coll) {
		var sum = 0;
		var friendsWithKnownFC = 0;
		coll.forEach(function(friend) {
			var age = +friend.get('friend_count');
			if (age) {
				sum += age;
				friendsWithKnownFC++;
			}
		});
		return Math.round(sum / (friendsWithKnownFC ? friendsWithKnownFC : 1));
	}

});
