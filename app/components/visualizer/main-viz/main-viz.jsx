import DonutChartComponent from "./templates/DonutChart/DonutChartComponent.jsx";

class MainViz extends React.Component {
  constructor(props) {
    super(props);
    this.state = { compData: [] };
  }

  componentDidMount() {
    var getJSON = () => {
      return $.getJSON("blobs/deptGrades.json", (data) => {
        this.setState({ compData: data });
      }).fail((error) => {
        console.log(error);
      });
    }

    setInterval(getJSON, 3000);
  }

  render() {
    return(<DonutChartComponent data={this.state.compData} />)
  }
}

React.render(<MainViz />, document.getElementById("main-viz"));
