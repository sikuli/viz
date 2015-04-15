function DynamicPieChart(config) {
    this.config = config || {};
    this.fields = config.fields;
    this.element = config.element || "body";
    this.id = config.id;
    this.data = config.data || {};
    this.width = config.width || 1024;
    this.height = config.height || 512;
    this.radius = Math.min(this.width, this.height) / 2;
    this.colors = config.colors ||
	["#6B0C22", "#D9042B", "#F4CB89", "#588C8C", "#011C26"];
    this.accessors = config.accessors;
    this.label = config.label || function(n) { return n; };
    var self = this;

    this.svg = d3.select(this.element).append("g");

    this.setupSvg = function() {
        ["slices", "labels", "lines"].forEach(function(item) {
            self.svg.append("g").attr("class", item);
        });

        self.svg.attr("transform", "translate(" + self.width / 2 + "," + self.height / 2 + ")");
    };

    this.pie = d3.layout.pie()
        .sort(null)
        .value(function(d) { return d.value; });

    this.arc = d3.svg.arc()
        .outerRadius(this.radius * 0.8)
        .innerRadius(this.radius * 0.4);

    this.key = this.accessors.label;

    this.color = d3.scale.ordinal()
        .domain(this.fields)
        .range(this.colors);

    var findObject = function(subject) {
        return _.find(self.data, function(item) {
            return item[self.id] === subject;
        });
    };

    this.coerceDataIntoUsableForm = function(subject) {
        var labels = self.color.domain();
        var discoveredObj = findObject(subject);
        var values = labels.map(function(label) {
            return {
                label: label,
                value: discoveredObj[label]
            };
        });

        return { title: discoveredObj[self.id], values: values };
    };

    this.loadVisualization = function(input) {
        let data = input.values;

        function createPieSlices() {
          console.log( self.svg.select(".slices").selectAll("path.slice"));
            var slice = self.svg.select(".slices")
                .selectAll("path.slice")
                .data(self.pie(input.values), self.key);

            slice.enter()
                .insert("path")
                .style("fill", function(d) { return self.color(d.data.label); })
                .attr("class", "slice");

            slice.transition().duration(1000)
                .attrTween("d", function(d) {
                    this._current = this._current || d;
                    var interpolate = d3.interpolate(this._current, d);
                    this._current = interpolate(0);
                    return function(t) {
                        return self.arc(interpolate(t));
                    };
                });

            slice.exit().remove();
        }

        function createTextLabels() {
            var text = self.svg.select(".labels").selectAll("text")
            .data(self.pie(data), self.key);

            text.enter()
                .append("text")
                .attr("dy", ".35em")
                .text(function(d) {
                    return self.label(d.data);
                })
                .style("font-weight", "bold")
                .style("font-size", "34px")
                .style("fill", "White");

            text.transition().duration(1000)
                .attr("transform", function(d) {
                    return "translate(" + self.arc.centroid(d) + ")";
                });

            text.exit().remove();
        }

        createPieSlices();
        createTextLabels();
    };

    d3.select(".majorInputSubmit").on("click", function(){
        var major = document.getElementById("majorInput").value;
        self.loadVisualization(self.coerceDataIntoUsableForm(major.toUpperCase()));
    });
}

DynamicPieChart.prototype.plot = function() {
    this.setupSvg();
    var data = this.coerceDataIntoUsableForm("CSCI");
    this.loadVisualization(data);
};

module.exports = DynamicPieChart;
