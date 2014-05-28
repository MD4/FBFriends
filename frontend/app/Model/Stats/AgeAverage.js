'use strict';

FbFriends.Model.Stats.AgeAverage = FbFriends.Model.Stat.extend({
	initialize: function() {
		this.set('type', 'ValueChart');
		this.set('id', 'AgeAverage');
		this.set('title', 'Age Average');
	},
	calcStat: function(coll) {
		var sum = 0;
		var friendsWithKnownAge = 0;
		coll.forEach(function(friend) {
			var age = friend.getAge();
			if (age) {
				sum += age;
				friendsWithKnownAge++;
			}
		});
		return Math.round(sum / (friendsWithKnownAge ? friendsWithKnownAge : 1)) + 'y.';
	}

});
