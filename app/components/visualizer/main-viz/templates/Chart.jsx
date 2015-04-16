import DonutChart from "./DonutChart.js";

class Chart extends React.Component {
  componentDidMount() {
    $.getJSON("blobs/deptGrades.json")
      .done((data) => {
        this.chart = new DonutChart({
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
          label: (d) => { return d.label.replace("PCT_", ""); },
          accessors: {
            label: (d) => { return d.data.label; }
          }
        });

        this.chart.plot();
      })
      .fail((jqxhr, textStatus, error) => {
        console.error(error);
      });
  }

  render() {
    return (
      <div className="Chart"></div>
    );
  }
}

module.exports = Chart;
