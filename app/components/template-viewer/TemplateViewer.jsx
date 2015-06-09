import TemplateItem from "./template-item/TemplateItem.jsx";
import Templates from "./../../templates/Templates.jsx";

export default class TemplateViewer extends React.Component {
  render() {
    return (
      <div>
        <h3>Templates</h3>
        <TemplateList />
      </div>
    );
  }
}

class TemplateList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {templates: Templates};
  }

  render() {
    return (
      <div>
        {
          this.state.templates.map((temp) => {
            return (
              <TemplateItem key={temp.id}
                            select={temp.id}
                            image={temp.image}
                            dimensions={temp.dimensions}
                            name={temp.name}
                            description={temp.description}
                            data={temp.data} />

            );
          })
        }
      </div>
    );
  }
}

React.render(<TemplateViewer />, document.getElementById("template-viewer"));
