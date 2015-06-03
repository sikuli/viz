// A template which allows us to render nothing in a useful way, following the
// Null Object pattern
export default class NullTemplateComponent extends React.Component {
  render() {
    return <div className="NullTemplateComponent" />;
  }
}
