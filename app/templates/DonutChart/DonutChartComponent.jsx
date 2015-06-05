import DonutChart from "./DonutChart.js";

export default class DonutChartComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // Ensure that we have data
    // TODO: make this less error prone
    // Defer rendering until data is ready?
    let d = this.filterData(this.props.data);

    this.chart = new DonutChart({
      id: d.major,
      data: d.data,
      element: "#donut-anchor"
    });

    this.chart.create();
  }

  componentDidUpdate() {
    let d = this.filterData(this.props.data);

    if (this.chart) {
      this.chart.update({
        id: d.major,
        data: d.data
      });
    }
  }

  render() {
    return (
      <div className="Chart">
        <svg id="donut-anchor" />
      </div>
    );
  }

  filterData(data) {
    if (!this.hasData()) {
      return {major: "", data: []};
    }

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

  hasData() {
    return this.props.data.length > 0;
  }
}
