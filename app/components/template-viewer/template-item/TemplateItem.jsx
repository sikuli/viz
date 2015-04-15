class TemplateItem extends React.Component{

    render() {
      return <div className="template-item col-md-10 col-md-offset-1">
        <div className="thumb-container">
          <img className="thumb-image" src={this.props.img}/>
        </div>
        <p className="details-container">{this.props.name}
          <span className="dims">({this.props.dims} dims)</span>
        </p>
            </div>;
        }
}

module.exports = TemplateItem;
