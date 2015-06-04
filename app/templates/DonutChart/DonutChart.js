// Configurator: a configuration abstraction which will serve
// as an abstract configuration for common configuration patterns.
// As of now, it is coupled to the DonutChart, but eventually
// this should be ripped out into into a more robust abstraction.
class Configurator {
  constructor(config = {}) {
    let defaults = {
      accessors: {},
      data: {
        "A": 0.2,
        "B": 0.2,
        "C": 0.2,
        "D": 0.2,
        "F": 0.2
      },
      element: "#donut-anchor",
      height: 512,
      id: "_id",
      label: "DonutChart",
      width: 1024,
      transitionTime: 1000
    };

    this.config = () => { return _.defaults(config, defaults); };
  }
}

class DonutChart {
  constructor(config) {
    this.config = new Configurator(config).config();

    this.radius = Math.min(this.config.width, this.config.height) / 2;

    this.arc = d3.svg.arc()
      .outerRadius(this.radius * 0.8)
      .innerRadius(this.radius * 0.4);

    this.pie = d3.layout.pie()
      .sort(null)
      .value((d) => { return d[1]; });

    this.svg = d3.select(this.config.element).append("g");
  }

  create() {
    this.setupSvg();
    let data = this.coerceDataIntoUsableForm();
    this.loadVisualization(data);
  }

  update(major) {
    this.config.data = major.data;
    this.config.id = major.id;
    let d = this.coerceDataIntoUsableForm();
    this.loadVisualization(d);
  }

  setupSvg() {
    this.svg.append("g").attr("class", "slices");
    this.svg.append("g").attr("class", "labels");
    this.svg.append("g").attr("class", "lines");
    this.svg.append("g")
      .attr("class", "title")
      .append("text")
      .attr("text-anchor", "middle")
      .attr("font-size", 28);

    this.svg.attr(
      "transform",
      "translate(" + this.config.width / 2 + "," + this.config.height / 2 + ")"
    );
  }

  // TODO: Decouple the data ceorcion logic
  coerceDataIntoUsableForm() {
    let values = _.pairs(this.config.data);

    return { title: this.config.id, values: values };
  }

  createPieSlices(values) {
    let self = this;

    let slice = this.svg.select(".slices")
      .selectAll("path.slice")
      .data(this.pie(values));

    slice.enter()
      .insert("path")
      .attr("class", "slice");

    slice.transition()
      .duration(this.config.transitionTime)
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
    .data(this.pie(values), (d) => {
      return d.data[0];
    });

    text.enter()
      .append("text")
      .attr("dy", ".35em")
      .text((d) => { return d.data[0]; })
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
    this.createTitle(input.title);
    this.createPieSlices(input.values);
    this.createTextLabels(input.values);
  }

  createTitle(title) {
    return this.svg
      .select(".title")
      .select("text")
      .text(title);
  }
}

module.exports = DonutChart;
