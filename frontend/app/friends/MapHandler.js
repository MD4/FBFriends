'use strict';

FbFriends.MapHandler = Backbone.Model.extend({
	initialize: function (options) {
		_.extend(this, options || {});
		var mapOptions = {
			center: new google.maps.LatLng(50, 0),
			zoom: 3
		};
		console.log(this.el);
		this.map = new google.maps.Map(this.el, mapOptions);
		//google.maps.event.addDomListener(window, 'load', initialize);
	}

});
