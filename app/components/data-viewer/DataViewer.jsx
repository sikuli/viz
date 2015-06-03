import FieldItem from "./field-item/FieldItem.jsx";
import PollingDataStore from "./../../controllers/PollingDataStore.js";

export default class DataViewer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {data: []};
  }

  componentDidMount() {
    this.unsubscribe = PollingDataStore.listen((data) => {
      this.setState({data: data});
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    return (
      <div className="data-viewer">
        <div className="container-fluid">
          <button className="btn btn-default spaced-button left">Load</button>
          <button className="btn btn-default spaced-button right">Connect</button>
        </div>

        <FieldsList data={this.state.data} />
      </div>
    );
  }
}

class FieldsList extends React.Component {
  extractUniqKeys(data) {
    let extractKeys = (d) => {
      return _.map(d, (obj) => {
        return Object.keys(obj);
      });
    };

    return _.compose(_.uniq, _.flatten, extractKeys)(data);
  }

  render() {
    let uniqKeys = this.extractUniqKeys(this.props.data);

    return (
      <div id="fields-list">
        <h3>Name</h3>
        {
          uniqKeys.map((n) => {
            return <FieldItem key={n} name={n} value="50%" />;
          })
        }
      </div>
    );
  }
}

React.render(<DataViewer />, document.getElementById("data-viewer"));
