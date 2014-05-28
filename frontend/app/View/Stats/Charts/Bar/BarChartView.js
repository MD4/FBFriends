'use strict';

FbFriends.View.Charts.BarChartView = Backbone.View.extend({
	initialize: function(options) {
		_.extend(this, options || {});
		this.graph = {};
	},
	render: function() {
		this.first = true;
		this.$el.html(
				this.tmpl({
					title: this.title
				})
				);
		var $svg = this.$el.find('svg');

		this.graph.svg = d3.select($svg.find('g')[0]);

		this.graph.width = 300;
		this.graph.height = 170;

		$svg
				.css('width', this.graph.width)
				.attr("width", this.graph.width)
				.attr("height", this.graph.height);




	},
	update: function(data) {
		var self = this;
		var transitionDuration = 1000;
		var transitionEasing = 'bounce';
		var barHeight = this.graph.height / data.values.length;

		if (this.first) {
			var bar = this.graph.svg.selectAll("g")
					.data(data.values)
					.enter()
					.append("g")
					.attr("transform", function(value, index) {
						return "translate(0," + index * barHeight + ")";
					});
			bar.append("rect");
			bar.append("text");
			bar.selectAll("text")
				.attr("x", this.graph.width - 0)
				.attr("y", barHeight / 2)
				.attr("dy", ".35em")
		} else {
			var bar = this.graph.svg.selectAll("g");
		}
		this.graph.svg.selectAll("g rect")
				.data(data.values)
				.transition()
				.duration(transitionDuration)
				.ease(transitionEasing)
				.attr("width", function(value, index) {
					return data.values[index].value * self.graph.width;
				})
				.attr("height", barHeight - 1);

		
		this.graph.svg.selectAll("g text")
				.data(data.values)
				.transition()
				.text(function(value, index) {
					return '(' + Math.round(value.value * 100) + '%) ' + value.label;
				});

		this.first = false;
	}

});
