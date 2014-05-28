'use strict';

FbFriends.Model.Stats.AgeDistribution = FbFriends.Model.Stat.extend({
	
	initialize: function() {
		this.set('type', 'BarChart');
		this.set('id', 'AgeDistribution');
		this.set('title', 'Age distribution');
	},
	calcStat: function(coll) {
		var data = {
			values: []
		};
		var sliceCount = 10;
		var sliceLength = (100 / sliceCount);
		var friendWithKnownAge = 0;
		
		for (var i = 0; i < sliceCount; i++) {
			data.values.push({
				label: i * sliceLength + '-' + (i + 1) * sliceLength,
				value: 0
			});
		}
		coll.forEach(function(friend){
			var age = friend.getAge();
			if (age) {
				data.values[Math.min(Math.floor(age / sliceLength), sliceCount - 1)].value++;
				friendWithKnownAge++;
			}
		});
		_.forEach(data.values, function(value){
			value.value = (value.value * 1) / (friendWithKnownAge ? friendWithKnownAge : 1);
		});
		return data;
	}
	
});
