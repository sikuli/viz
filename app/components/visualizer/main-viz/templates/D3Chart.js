class D3Chart {
  constructor(el, props, state) {
    let svg = d3.select(el).append("svg")
      .attr("class", "d3")
      .attr("width", props.width)
      .attr("height", props.height);

    svg.append("g")
      .attr("class", "d3-points");

    this.update(el, state);
  }

  update(el, state) {
    let scales = d3.scale.linear();
    this.drawPoints(el, scales, state.data);
  }

  destroy(el) {}

  drawPoints(el, scales, data) {
    let g = d3.select(el).selectAll(".d3-points");

    let point = g.selectAll(".d3-point")
      .data(data, (d) => { return d.id; });

    point.enter().append("circle")
      .attr("class", "d3-point");

    point
    // TODO: Use x, y, z here
      .attr("cx", (d) => { return scales(d.x); })
      .attr("cy", (d) => { return scales(d.y); })
      .attr("r", (d) => { return scales(d.z); });

    point.exit().remove();
  }
}

module.exports = D3Chart;
