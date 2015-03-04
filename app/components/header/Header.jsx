var Header = React.createClass({
  render: function() {
    return (<div className="testClass">Viz</div>);
  }
});

React.render(
  <Header />,
  document.getElementById("test-class")
);
