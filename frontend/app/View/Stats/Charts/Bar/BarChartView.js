'use strict';

FbFriends.View.Charts.BarChartView = Backbone.View.extend({
	initialize: function (options) {
		_.extend(this, options || {});
		this.graph = {};
	},
	render: function () {
		this.$el.html(
				this.tmpl({
					title: this.title
				})
				);
		var $svg = this.$el.find('svg');
		this.graph.width = 380;
		this.graph.height = 170;
		this.graph.radius = Math.min(this.graph.width, this.graph.height) / 2;

		$svg.css('width', this.graph.width);
		
		this.graph.svg = d3.select($svg.find('g')[0]);
		this.graph.pie = d3.layout.pie()
				.sort(null)
				.value(function (d) {
					return d.value;
				});

		this.graph.arc = d3.svg.arc()
				.outerRadius(this.graph.radius * 0.8)
				.innerRadius(this.graph.radius * 0.4);

		this.graph.outerArc = d3.svg.arc()
				.innerRadius(this.graph.radius * 0.9)
				.outerRadius(this.graph.radius * 0.9);

		this.graph.svg.attr("transform", "translate(" + this.graph.width / 2 + "," + this.graph.height / 2 + ")");
	},
	update: function (data) {
		var self = this;
		var key = function (d) {
			return d.data.label;
		};
		var color = d3.scale.ordinal()
				.range(data.colors);
		
		/* ------- PIE SLICES -------*/
		var slice = this.graph.svg.select(".slices").selectAll("path.slice")
				.data(this.graph.pie(data.values), key);

		slice.enter()
				.insert("path")
				.style("fill", function (d) {
					return color(d.data.label);
				})
				.attr("class", "slice");
		
		slice
				.transition().duration(1000)
				.attrTween("d", function (d) {
					this._current = this._current || d;
					var interpolate = d3.interpolate(this._current, d);
					this._current = interpolate(0);
					return function (t) {
						return self.graph.arc(interpolate(t));
					};
				});

		slice.exit()
				.remove();

		/* ------- TEXT LABELS -------*/

		var text = this.graph.svg.select(".labels").selectAll("text")
				.data(this.graph.pie(data.values), key);

		text.enter()
				.append("text")
				.attr("dy", ".35em")
				.style("fill", "white")
				.text(function (d) {
					return d.data.label;
				});

		function midAngle (d) {
			return d.startAngle + (d.endAngle - d.startAngle) / 2;
		}

		text.transition().duration(1000)
				.attrTween("transform", function (d) {
					this._current = this._current || d;
					var interpolate = d3.interpolate(this._current, d);
					this._current = interpolate(0);
					return function (t) {
						var d2 = interpolate(t);
						var pos = self.graph.outerArc.centroid(d2);
						pos[0] = self.graph.radius * (midAngle(d2) < Math.PI ? 1 : -1);
						return "translate(" + pos + ")";
					};
				})
				.styleTween("text-anchor", function (d) {
					this._current = this._current || d;
					var interpolate = d3.interpolate(this._current, d);
					this._current = interpolate(0);
					return function (t) {
						var d2 = interpolate(t);
						return midAngle(d2) < Math.PI ? "start" : "end";
					};
				});

		text.exit()
				.remove();

		/* ------- SLICE TO TEXT POLYLINES -------*/

		var polyline = this.graph.svg.select(".lines").selectAll("polyline")
				.data(this.graph.pie(data.values), key);

		polyline.enter()
				.append("polyline");

		polyline.transition().duration(1000)
				.attrTween("points", function (d) {
					this._current = this._current || d;
					var interpolate = d3.interpolate(this._current, d);
					this._current = interpolate(0);
					return function (t) {
						var d2 = interpolate(t);
						var pos = self.graph.outerArc.centroid(d2);
						pos[0] = self.graph.radius * 0.95 * (midAngle(d2) < Math.PI ? 1 : -1);
						return [self.graph.arc.centroid(d2), self.graph.outerArc.centroid(d2), pos];
					};
				});
				
		polyline.exit()
				.remove();
	}

});
