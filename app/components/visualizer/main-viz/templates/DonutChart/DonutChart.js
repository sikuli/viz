// Configurator: a configuration abstraction which will serve
// as an abstract configuration for common configuration patterns.
// As of now, it is coupled to the DonutChart, but eventually
// this should be ripped out into into a more robust abstraction.
class Configurator {
  constructor(config = {}) {
    let defaults = {
      accessors: {},
      colors: ["#6B0C22", "#D9042B", "#F4CB89", "#588C8C", "#011C26"],
      data: {},
      element: "body",
      fields: {},
      height: 512,
      id: "_id",
      label: (n) => { return n; },
      width: 1024,
      transitionTime: 500
    };

    this.config = () => { return _.merge(defaults, config); };
  }
}

class DonutChart {
  constructor(config) {
    this.config = new Configurator(config).config();

    this.radius = Math.min(this.config.width, this.config.height) / 2;

    this.arc = d3.svg.arc()
      .outerRadius(this.radius * 0.8)
      .innerRadius(this.radius * 0.4);

    this.color = d3.scale.ordinal()
      .domain(this.config.fields)
      .range(this.config.colors);

    this.pie = d3.layout.pie()
      .sort(null)
      .value((d) => { return d.value; });

    this.svg = d3.select(this.config.element).append("g");

    this.key = this.config.accessors.label;
  }

  plot() {
    this.setupSvg();
    let data = this.coerceDataIntoUsableForm("CSCI");
    this.loadVisualization(data);
  }

  update() {
    let data = this.coerceDataIntoUsableForm("MATH");
    this.loadVisualization(data);
  }

  setupSvg() {
    this.svg.append("g").attr("class", "slices");
    this.svg.append("g").attr("class", "labels");
    this.svg.append("g").attr("class", "lines");

    this.svg.attr(
      "transform",
      "translate(" + this.config.width / 2 + "," + this.config.height / 2 + ")"
    );
  }

  coerceDataIntoUsableForm(subject) {
      let labels = this.color.domain();
      let discoveredObj = _.sample(this.config.data);
      let values = labels.map((label) => {
          return {
              label: label,
              value: discoveredObj[label]
          };
      });

      return { title: discoveredObj[this.id], values: values };
  }

  createPieSlices(values) {
    let self = this;

    let slice = this.svg.select(".slices")
      .selectAll("path.slice")
      .data(this.pie(values), this.key);

    slice.enter()
      .insert("path")
      .style("fill", (d) => { return this.color(d.data.label); })
      .attr("class", "slice");

    slice.transition()
      .duration(this.config.transitionTime)
      // Arrow functions are not only syntactical sugar, they lexically bind
      // 'this'!
      .attrTween("d", function(d) {
        this.current = this.current || d;
        let interpolateIt = d3.interpolate(this.current, d);
        this.current = interpolateIt(0);

        return function(t) { return self.arc(interpolateIt(t)); };
      });

    slice.exit().remove();
  }

  createTextLabels(values) {
    let text = this.svg.select(".labels").selectAll("text")
      .data(this.pie(values), this.key);

    text.enter()
      .append("text")
      .attr("dy", ".35em")
      .text((d) => { return this.config.label(d.data); })
      .style("font-weight", "bold")
      .style("font-size", "34px")
      .style("fill", "White");

    text.transition()
      .duration(this.config.transitionTime)
      .attr("transform", (d) => {
        return `translate(${this.arc.centroid(d)})`;
      });

    text.exit().remove();
  }

  loadVisualization(input) {
    this.createPieSlices(input.values);
    this.createTextLabels(input.values);
  }
}

module.exports = DonutChart;
