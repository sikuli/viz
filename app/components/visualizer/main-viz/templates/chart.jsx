import D3Chart from "./D3Chart.js"

class Chart extends React.Component {
  componentDidMount() {
    let el = React.findDOMNode(this);
    this.chart = new D3Chart(el, {
      width: "100%",
      height: "300px"
    }, this.getChartState());
  }

  componentDidUpdate() {
    let el = React.findDOMNode(this);
    this.chart.update(el, this.getChartState());
  }

  getChartState() {
    var sampleData = [
      {id: "5fbmzmtc", x: 7, y: 41, z: 6},
      {id: "s4f8phwm", x: 11, y: 45, z: 9}
    ];

    var sDomain = {x: [0, 30], y: [0, 100]};

    return {
      data: sampleData,
      domain: sDomain
    };
  }

  componentWillUnmount() {
    let el = React.findDOMNode(this);
    this.chart.destroy(el);
  }

  render() {
    return (
      <div className="Chart"></div>
    );
  }
}

Chart.propTypes = {
  data: React.PropTypes.array,
  domain: React.PropTypes.object
};

module.exports = Chart;
