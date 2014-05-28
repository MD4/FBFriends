'use strict';

FbFriends.Model.Stats.MFDistribution = FbFriends.Model.Stat.extend({
	
	initialize: function() {
		this.set('type', 'PieChart');
		this.set('id', 'MFDistribution');
		this.set('title', 'Sex distribution');
	},
	calcStat: function(coll) {
		var data = {
			colors: [
				'#0053D9',
				'#D9007B',
				'gray'
			],
			values: [
				{
					label: "Men",
					value: 0
				},
				{
					label: "Women",
					value: 0
				},
				{
					label: "Unknown",
					value: 0
				}
			]
		};
		var hasChanged = false;
		coll.forEach(function(friend){
			var sex = friend.get('sex');
			if (sex === 'male') {
				data.values[0].value++;
				hasChanged = true;
			} else if (sex === 'female') {
				data.values[1].value++;
				hasChanged = true;
			} else {
				data.values[2].value++;
				hasChanged = true;
			}
		});
		if (!hasChanged) {
			data.values[0].value = data.values[1].value = data.values[2].value = 1;
		}
		
		return data;
	}
	
});
