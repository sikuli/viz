import DonutChartComponent from "./templates/DonutChart/DonutChartComponent.jsx";
import PollingDataStore from "./../../../controllers/PollingDataStore.js";

class MainViz extends React.Component {
  constructor(props) {
    super(props);
    this.state = { compData: [] };
  }

  componentDidMount() {
    this.unsubscribe = PollingDataStore.listen((data) => {
      this.setState({ compData: data });
    });
  }

  componentWillUnmount() {
    return this.unsubscribe();
  }

  render() {
    return <DonutChartComponent data={this.state.compData} />;
  }
}

React.render(<MainViz />, document.getElementById("main-viz"));
