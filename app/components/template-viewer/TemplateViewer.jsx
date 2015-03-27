import TemplateItem from "./TemplateItem.jsx";

class TemplateViewer extends React.Component {

  render() {
    return (
        <div className="template-viewer"></div>
        );
  }
};

module.exports = TemplateViewer;

var TemplateList = React.createClass({
    render() {
        var head = (<h3 className="template-head col-md-8 col-md-offset-4">Templates</h3>);
        return (<div>
                    {head}
                    <TemplateItem />
                    <TemplateItem />
                </div>
                );
    }
});

React.render(<TemplateList />, document.getElementById("template-container"));
