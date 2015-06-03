class TemplateItem extends React.Component {
  render() {
    return (
      <div className="template-item col-md-10 col-md-offset-1">
        <img alt="template preview image" src={this.props.image}></img>
        <h3>{this.props.name}</h3>
        <p>{this.props.description}</p>
        <h4>Specs:</h4>
        <ul>
          <li>Dimensions: {this.props.dimensions}</li>
        </ul>
    </div>
    );
  }
}

module.exports = TemplateItem;
