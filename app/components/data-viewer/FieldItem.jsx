var FieldItem = React.createClass({

   render: function() {
      return <div className="field-item">
               <div>
                  <b>Field Name</b>
                  <p style={{margin: "0px", color: "yellow"}}>75%</p>
               </div>
               <a href="http://www.google.com/">
                  <div>
                     Bind
                  </div>
               </a>
             </div>
   }

});

module.exports = FieldItem;