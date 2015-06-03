import FieldItem from "./field-item/FieldItem.jsx";

export default class DataViewer extends React.Component {
  render() {
    return <div className="data-viewer" />;
  }
}

class FieldsList extends React.Component {
  render() {
    return (
      <div>
        <h3>Name</h3>
        <FieldItem name="Field 1" value="50%" />
        <FieldItem name="Field 2" value="50%" />
        <FieldItem name="Field 3" value="50%" />
      </div>
    );
  }
}

React.render(<FieldsList />, document.getElementById("fields-list"));
