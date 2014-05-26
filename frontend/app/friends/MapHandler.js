'use strict';

FbFriends.MapHandler = Backbone.Model.extend({
	initialize: function(options) {
		_.extend(this, options || {});

		if (this.profilesView) {
			this.profilesView.on('change:selectedFriend', this.centerOnFriend, this);
			this.profilesView.on('create:friendMarker', this.addFriendMarker, this);
			this.profilesView.on('reset:allMarkers', this.deleteAllMarkers, this);
		}

		var mapOptions = {
			center: new google.maps.LatLng(50, 0),
			zoom: 3
		};
		this.map = new google.maps.Map(this.el, mapOptions);
		this.markers = {};
		this.lastMarker = null;
	},
	centerOn: function(lon, lat) {
		if (!lon || !lat) {
			return;
		}
		this.map.setZoom(15);
		this.map.setCenter(new google.maps.LatLng(+lat, +lon));
	},
	addMarker: function(id, lon, lat, name) {
		if (!lon || !lat) {
			return;
		}
		var marker = new google.maps.Marker({
			position: new google.maps.LatLng(+lat, +lon),
			map: this.map,
			title: name,
			id: id,
			icon: '../static/images/marker.png'
		});
		google.maps.event.addListener(marker, 'click', function() {
			this.profilesView.selectProfileByUid(marker.id);
		}.bind(this));
		this.markers[id] = marker;
	},
	deleteAllMarkers: function() {
		_.forEach(this.markers, function(marker) {
			marker.setMap(null);
		});
		this.markers = {};
	},
	addFriendMarker: function(friend) {
		if (friend) {
			var location = friend.get('current_location') || {};
			this.addMarker(friend.get('uid'), location.longitude, location.latitude, friend.get('first_name') + ' ' + friend.get('last_name').toUpperCase());
		}
	},
	centerOnFriend: function(friend) {
		if (friend) {
			var location = friend.get('current_location') || {};
			var marker = this.markers[friend.get('uid')];

			this.centerOn(location.longitude, location.latitude);
			if (this.lastMarker) {
				this.lastMarker.setIcon('../static/images/marker.png');
			}
			if (marker) {
				marker.setIcon('../static/images/markerSel.png');
			}
			this.lastMarker = marker;
		}
	}

});
