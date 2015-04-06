var TemplateItem = React.createClass({

    render: function() {
      return <div className="template-item col-md-10 col-md-offset-1">
        <div className="thumb-container">
          <img className="thumb-image" src="images/barchart.png"/>
        </div>
        <p className="details-container">Bar Chart
          <span className="dims">(2 dims)</span>
        </p>
            </div>;
        }
});

module.exports = TemplateItem;
