import DonutChartComponent from "./../../../templates/DonutChart/DonutChartComponent.jsx";
import NullTemplateComponent from "./../../../templates/NullTemplate/NullTemplateComponent.jsx";
import PollingDataStore from "./../../../controllers/PollingDataStore.js";
import {TemplateStore} from "./../../../controllers/TemplateStore.js";

class MainViz extends React.Component {
  constructor(props) {
    super(props);

    // The state of the component includes the current dataset, and which
    // template to render.
    this.state = {
      data: [],
      template: NullTemplateComponent
    };
  }

  // After the component is mounted, we subscribe to the data and template
  // stores. With this approach, the state of our component updates whenever
  // there is an event in which either:
  //
  //   a) the data is updated
  //   b) the template to render has been changed
  componentDidMount() {
    this.unsubscribeFromData = PollingDataStore.listen((data) => {
      this.setState({
        data: data,
        template: this.state.template
      });
    });

    this.unsubscribeFromTemplates = TemplateStore.listen((template) => {
      this.setState({
        data: this.state.data,
        template: template
      });
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromData();
    this.unsubscribeFromTemplates();
  }

  render() {
    return <this.state.template data={this.state.data} />;
  }
}

React.render(<MainViz />, document.getElementById("main-viz"));
