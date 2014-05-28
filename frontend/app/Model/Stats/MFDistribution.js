'use strict';

FbFriends.Model.Stats.MFDistribution = FbFriends.Model.Stat.extend({
	
	initialize: function() {
		this.set('type', 'BarChart');
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
		coll.forEach(function(friend){
			var sex = friend.get('sex');
			if (sex == 'male') {
				data.values[0].value++;
			} else if (sex == 'female') {
				data.values[1].value++;
			} else {
				data.values[2].value++;
			}
		});
		
		return data;
	}
	
});
