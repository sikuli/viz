// sub-component imports
import FieldItem from "./field-item/FieldItem.jsx";
// end sub-component imports
class DataViewer extends React.Component {
  render() {
    return (<div className="data-viewer"></div>);
  }
}

module.exports = DataViewer;

var FieldsListView = React.createClass({

   render: function() {
     $.get("http://localhost:6461/api/metadata", function(metadata) {
       console.log(metadata);
     });
     var header = (<h6 className="detail-header">Fields</h6>);
      return <div>
               {header}
               <FieldItem />
             </div>;
   }

});

React.render(<FieldsListView />, document.getElementById("dataViewerContainer"));
