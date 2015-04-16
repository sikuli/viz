import TemplateItem from "./template-item/TemplateItem.jsx";

class TemplateViewer extends React.Component {

  render() {
    return (
        <div className="template-viewer"></div>
        );
  }
}

module.exports = TemplateViewer;

class TemplateList extends React.Component {


    constructor() {
        this.state = {templates: []}
        console.log("in constructor");
        $.getJSON("http://localhost:9000/blobs/templates.json", function (data) {
            this.setState({templates: data});
        }.bind(this)).fail(function (error) {
            console.log(error);
        }.bind(this));
    }

    passData(index) {
        console.log(this);
        console.log(this.state.templates[index].data);

    }

    render() {
        var head = (<h3 className="template-head col-md-8 col-md-offset-4">Templates</h3>);
        return (<div>
                    {head}
                    { _.map(this.state.templates, function (temp, i) {
                        var dataSend = this.passData.bind(this,i);
                        return <TemplateItem key={temp.id} onClick={dataSend} select={temp.id} img={temp.imageURL} dims={temp.dims} name={temp.templateName} data={temp.data} />;
                        }.bind(this))
                    }
                </div>
            );
    }
}

React.render(<TemplateList />, document.getElementById("template-container"));
