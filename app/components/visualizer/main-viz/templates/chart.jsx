import DynamicPieChart from "./DynamicPieChart.js";

class Chart extends React.Component {
  componentDidMount() {
    let el = React.findDOMNode(this);

    $.getJSON("blobs/deptGrades.json", (data) => {
      this.chart = new DynamicPieChart({
        id: "_id",
        data: data,
        element: "#main-viz",
        height: 512,
        width: 1024,
        fields: [
          "PCT_A",
          "PCT_B",
          "PCT_C",
          "PCT_D",
          "PCT_F"
        ],
        label: function(d) { return d.label.replace("PCT_", ""); },
        accessors: {
          label: function(d) { return d.data.label; }
        }
      });

      this.chart.plot();
    });
  }

  componentDidUpdate() {}

  componentWillUnmount() {}

  render() {
    return (
      <div className="Chart"></div>
    );
  }
}

module.exports = Chart;
