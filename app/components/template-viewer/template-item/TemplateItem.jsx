import {changeTemplate} from "./../../../controllers/TemplateStore.js";

export default class TemplateItem extends React.Component {
  handleClick() {
    return changeTemplate(this.props.name);
  }

  render() {
    return (
      <div className="template-item col-md-10 col-md-offset-1"
           onClick={this.handleClick.bind(this)}>
        <img alt="template preview image" src={this.props.image}></img>
        <h3>{this.props.name.name}</h3>
        <p>{this.props.description}</p>
        <h4>Specs:</h4>
        <ul>
          <li>Dimensions: {this.props.dimensions}</li>
        </ul>
      </div>
    );
  }
}
