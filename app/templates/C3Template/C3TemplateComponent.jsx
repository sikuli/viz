export default class C3TemplateComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.plot();
  }

  plot() {
    this.chart = c3.generate({
      bindto: "#template-anchor",
      data: {
        columns: [
          ["data1", 30, 200, 100, 400, 150, 250],
          ["data2", 50, 20, 10, 40, 15, 25]
        ]
      }
    });
  }

  render() {
    return <div className="C3TemplateComponent" />;
  }
}
