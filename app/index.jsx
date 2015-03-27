import Header from "./components/header/Header.jsx";
import Footer from "./components/footer/Footer.jsx";
import DataViewer from "./components/data-viewer/DataViewer.jsx";
import TemplateViewer from "./components/template-viewer/TemplateViewer.jsx";
import Visualizer from "./components/visualizer/Visualizer.jsx";

$('.collapser').on('click', function() {
  var dataP = $('#data-viewer');
  var templateV = $('#template-viewer');
  var visualizerW = $("#visualizer");
  console.log(dataP.css("visibility") == "collapse");
  
  if (dataP.css("display") == "none" && templateV.css("display") == "none") {
    visualizerW.animate({width: "60%"}, function () {
      dataP.animate( {"margin-right": "0px" }, 500 ).css("visibility", "visible").css( "display", "block");
      templateV.animate( {"margin-left": "0px"}, 500 ).css("visibility", "visible").css( "display", "block");
    });
  } else {
    visualizerW.animate({width: "100%"}, function () {
      dataP.animate( {"margin-right": "-500px" }, 500 ).css("visibility", "collapsed").css( "display", "none");
      templateV.animate( {"margin-left": "-500px"}, 500 ).css("visibility", "collapsed").css( "display", "none");
    });
  };

});

