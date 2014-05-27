'use strict';

FbFriends.Model.Friends = Backbone.Collection.extend({
	SORT_ORDER_ASC: true,
	SORT_ORDER_DESC: false,
	
	model: FbFriends.Model.Friend,
	lastSort: '',
	
	filterResultSet: null,
	
	initialize: function() {
		this.sortOrder = this.SORT_ORDER_ASC;
	},
	
	/**
	 * [filterByFullname description]
	 * @param  {String} query
	 */
	filterByFullname: function(query) {
		var filteredColl = this.filter(function(friendModel) {
			return friendModel.fullNameContains(query);
		});
		this.filterResultSet = new FbFriends.Model.Friends(filteredColl);
		this.trigger('reset', this.filterResultSet);
	},
	sortByAttribute: function(attribute) {
		var NUMBER_OPTIONS = {
			getValue: function(rawValue) {
				return +rawValue || Number.MIN_VALUE;
			},
			comparator: function(a, b) {
				return b - a;
			}
		};
		
		var visitors = {
			'birthday_date': {
				getValue: function(rawValue) {
					return rawValue ? +new Date(rawValue) : Number.MAX_VALUE;
				}
			},
			'friend_count': NUMBER_OPTIONS,
			'wall_count': NUMBER_OPTIONS
		};
		
		var options = visitors[attribute] || {};
		options.reverse = this.sortOrder;
		
		this.lastSort = attribute;
		this.filterResultSet.uberSort(attribute, options);
		this.trigger('reset', this.filterResultSet);
	},
	sortBis: function() {
		this.sortByAttribute(this.lastSort);
	},
	sortToggleOrder: function() {
		this.sortOrder = !(this.sortOrder);
		this.sortBis();
	}

});
