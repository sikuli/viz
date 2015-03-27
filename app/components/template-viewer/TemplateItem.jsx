var TemplateItem = React.createClass({

    render: function() {
        return <div className="template-item col-md-10 col-md-offset-1">
                    <img src="images/barchart.png" align="middle" width="100%" />
                    <p>Bar Chart <span className="dims">(2 dims)</span></p>
                </div>;
        } 
    
});

module.exports = TemplateItem;