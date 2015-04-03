var FieldItem = React.createClass({

   render: function() {
      return <div className="field-item container-fluid">
               <div className="col-md-8">
                  <b>Field Name</b>
                  <p className="field-name">%75 </p>
               </div>
               <a href="http://www.google.com/" className="col-md-4">
                 <div className="field-link">
                     Bind
                  </div>
               </a>
             </div>;
   }

});

module.exports = FieldItem;
