import TemplateItem from "./template-item/TemplateItem.jsx";

class TemplateViewer extends React.Component {

  render() {
    return (<div className="template-viewer"></div>);
  }
}

module.exports = TemplateViewer;

class TemplateList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {templates: []};
  }

  componentDidMount() {
    return $.getJSON("blobs/templates.json", (data) => {
      this.setState({templates: data});
    }).fail((error) => {
      console.error(error);
    });
  }

  render() {
    return (
      <div>
          <h3 className="template-head col-md-8 col-md-offset-4">Templates</h3>;
          {
            this.state.templates.map((temp) => {
              return <TemplateItem key={temp.id}
                      select={temp.id}
                      img={temp.imageURL}
                      dims={temp.dims}
                      name={temp.templateName}
                      data={temp.data} />;
            })
        }
      </div>
    );
  }
}

React.render(<TemplateList />, document.getElementById("template-container"));
