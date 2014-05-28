'use strict';

FbFriends.Model.Stats.OnlineDistribution = FbFriends.Model.Stat.extend({
	initialize: function() {
		this.set('type', 'PieChart');
		this.set('id', 'OnlineDistribution');
		this.set('title', 'Online Distribution');
	},
	calcStat: function(coll) {
		var data = {
			colors: [
				'red',
				'green',
				'orange'
			],
			values: []
		};
		var hasChanged = false;
		var statuses = [
			'offline',
			'active',
			'idle'
		];
		_.forEach(statuses, function(status){
			data.values.push({
				label: status,
				value: 0
			});
		});
		coll.forEach(function(friend) {
			var status = friend.get('online_presence');
			if (data.values[statuses.indexOf(status)]) {
				hasChanged = true ;
				data.values[statuses.indexOf(status)].value++;
			}
		});
		if (!hasChanged) {
			_.forEach(data.values, function(value){
				value.value = 1;
			});
		}
		return data;
	}

});
