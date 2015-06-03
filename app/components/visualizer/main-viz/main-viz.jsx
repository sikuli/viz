import DonutChartComponent from "./templates/DonutChart/DonutChartComponent.jsx";
import PollingDataStore from "./../../../controllers/PollingDataStore.js";

class MainViz extends React.Component {
  constructor(props) {
    super(props);

    // The state of the component includes the current dataset, and which
    // template to render.
    this.state = {
      data: [],
      template: DonutChartComponent
    };
  }

  componentDidMount() {
    this.unsubscribe = PollingDataStore.listen((data) => {
      this.setState({ data: data });
    });
  }

  componentWillUnmount() {
    return this.unsubscribe();
  }

  render() {
    return <this.state.template data={this.state.data} />;
  }
}

React.render(<MainViz />, document.getElementById("main-viz"));
