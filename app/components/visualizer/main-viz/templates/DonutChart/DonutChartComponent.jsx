import DonutChart from "./DonutChart.js";

class DonutChartComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  plot() {
    if (!this.chart) {
      this.chart = new DonutChart({
        id: "_id",
        data: this.props.data,
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
        label: (d) => { return d.label.replace("PCT_", ""); },
        accessors: {
          label: (d) => { return d.data.label; }
        }
      });
    }

    // Ghetto: but shows working update.
    // TODO: Remove this loaded logic
    if (this.loaded) {
      this.chart.update();
    } else {
      this.chart.create();
      this.loaded = true;
    }
  };

  render() {
    // Ensure there is actually data to be rendered
    // TODO: Find cleaner way to ensure there is data to render
    if (this.props.data.length > 0) {
      this.plot();
    }

    return <div className="Chart"></div>;
  }
}

module.exports = DonutChartComponent;
