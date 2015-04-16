// Configurator: a configuration abstraction which will serve
// as an abstract configuration for common configuration patterns.
// As of now, it is coupled to the DynamicPieChart, but eventually
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
      width: 1024
    };

    this.config = () => { return _.merge(defaults, config); };
  }
}

class DynamicPieChart {
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
  }

  plot() {
    this.setupSvg();
    let data = this.coerceDataIntoUsableForm("CSCI");
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
  };

  findObject(subject) {
    return _.find(this.config.data, (item) => {
      return item[this.config.id] === subject;
    });
  }

  coerceDataIntoUsableForm(subject) {
      let labels = this.color.domain();
      let discoveredObj = this.findObject(subject);
      let values = labels.map((label) => {
          return {
              label: label,
              value: discoveredObj[label]
          };
      });

      return { title: discoveredObj[self.id], values: values };
  }

  createPieSlices(values) {
    let self = this;

    let slice = this.svg.select(".slices")
      .selectAll("path.slice")
      .data(this.pie(values), this.config.key);

    slice.enter()
      .insert("path")
      .style("fill", (d) => { return self.color(d.data.label); })
      .attr("class", "slice");

    slice.transition()
      .duration(1000)
      .attrTween("d", (d) => {
        this.current = this.current || d;
        let interpolate = d3.interpolate(this.current, d);
        this.current = interpolate(0);

        return (t) => { return self.arc(interpolate(t)); };
      });

    slice.exit().remove();
  }

  createTextLabels(values) {
    let self = this;

    let text = this.svg.select(".labels").selectAll("text")
      .data(this.pie(values), this.config.key);

    text.enter()
      .append("text")
      .attr("dy", ".35em")
      .text((d) => { return self.config.label(d.data); })
      .style("font-weight", "bold")
      .style("font-size", "34px")
      .style("fill", "White");

    text.transition()
      .duration(1000)
      .attr("transform", (d) => {
        return `translate(${self.arc.centroid(d)})`;
      });

    text.exit().remove();
  }

  loadVisualization(input) {
    this.createPieSlices(input.values);
    this.createTextLabels(input.values);
  }
}

module.exports = DynamicPieChart;
