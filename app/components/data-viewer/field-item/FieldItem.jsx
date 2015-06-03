export default class FieldItem extends React.Component {
  render() {
    return (
      <div className="field-item container-fluid">
         <div className="col-md-6">
            <b>{this.props.name}</b>
            <p>{this.props.value}</p>
         </div>
        <div className="checkbox col-md-6">
          <label><input type="checkbox" /></label>
        </div>
      </div>
    );
  }
}
