var FieldItem = React.createClass({

   render: function() {
      return <div className="field-item container-fluid">
               <div className="col-md-8">
                  <b>Field Name</b>
                  <p style={{margin: "0px", color: "yellow", "font-size": "10px"}}>75%</p>
               </div>
               <a href="http://www.google.com/" className="col-md-4">
                  <div>
                     Bind
                  </div>
               </a>
             </div>
   }

});

module.exports = FieldItem;
