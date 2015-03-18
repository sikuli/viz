import FieldItem from "./FieldItem.jsx";

class DataViewer extends React.Component {
  render() {
    return (<div className="data-viewer"></div>);
  }
}

module.exports = DataViewer;


var FieldsListView = React.createClass({

   render: function(){
      var header = <h6 className="detailHeader">1,500 objects</h6>
      
      return <div>
               {header}
               <FieldItem />
               <FieldItem />
               <FieldItem />
             </div>;
   }

});

React.render(<FieldsListView />, document.getElementById("dataViewerContainer"));