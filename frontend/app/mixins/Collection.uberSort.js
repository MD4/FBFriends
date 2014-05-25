Backbone.Collection.prototype.uberSort = function(sortString, options) {
	options = options || {};
	
	var comparator = options.comparator || function(a, b){
		return _.isString(a) && _.isString(b) ? a .localeCompare(b) : b - a;
	};
	var getValue = options.getValue || function(rawValue) {
		return '' + rawValue;
	};
	
	function getAttribute(model, stringPath) {
		var path = stringPath.split('.');
		return _.reduce(
			path,
			function(memo, level){
				return (memo || {})[level];
			},
			model.attributes
		);
	};
	
	this.comparator = function(a, b) {
		a = getValue(getAttribute(a, sortString));
		b = getValue(getAttribute(b, sortString));
		return (options.reverse ? 1 : -1) * comparator(a, b);
	};
	
	return this.sort();
	
};