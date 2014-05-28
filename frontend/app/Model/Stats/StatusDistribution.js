'use strict';

FbFriends.Model.Stats.StatusDistribution = FbFriends.Model.Stat.extend({
	initialize: function() {
		this.set('type', 'PieChart');
		this.set('id', 'StatusDistribution');
		this.set('title', 'Status distribution');
	},
	calcStat: function(coll) {
		var data = {
			colors: [
				'gray',
				'#0053D9',
				'red',
				'#D9007B',
			],
			values: []
		};
		var hasChanged = false;
		var statuses = [
			'Unkown',
			'Single',
			'In a relationship',
			'Engaged',
			'Married',
			'It\'s complicated',
			'In an open relationship',
			'Widowed',
			'Separated',
			'Divorced'
		];
		_.forEach(statuses, function(status){
			data.values.push({
				label: status,
				value: 0
			});
		});
		coll.forEach(function(friend) {
			var status = friend.get('relationship_status') || 'Unkown';
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

