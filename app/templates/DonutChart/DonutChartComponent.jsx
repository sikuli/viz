import DonutChart from "./DonutChart.js";

export default class DonutChartComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // Ensure there is actually data to be rendered
    // TODO: Find cleaner way to ensure there is data to render
    if (this.props.data.length > 0) {
      this.plot();
    }
  }

  plot() {
    if (!this.chart) {
      let d = this.filterData(this.props.data);

      this.chart = new DonutChart({
        id: d.major,
        data: d.data
      });
    }

    // Ghetto: but shows working update.
    // TODO: Remove this loaded logic
    if (this.loaded) {
      let d = this.filterData(this.props.data);
      this.chart.update({
        id: d.major,
        data: d.data
      });
    } else {
      this.chart.create();
      this.loaded = true;
    }
  };

  render() {
    return <div className="Chart"></div>;
  }

  filterData(data) {
    let d = _.sample(data);
    let major = d._id;

    let prepareDataForViz = (obj) => {
      // Filter for percentages greater than 0
      let keys = _.filter(Object.keys(obj), (key) => { return obj[key] > 0; });

      // Get the vals of the keys so we can zip them together later
      let vals = _.map(keys, (key) => { return obj[key]; });

      // Get last letter of the string
      let parsedKeys = keys.map((key) => { return key.slice(-1); });

      // Combine keys and vals into an object
      return _.zipObject(parsedKeys, vals);
    };

    return {major: major, data: prepareDataForViz(d)};
  }
}
