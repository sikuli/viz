import Header from "./components/header/Header.jsx";
import Footer from "./components/footer/Footer.jsx";
import DataViewer from "./components/data-viewer/DataViewer.jsx";
import TemplateViewer from "./components/template-viewer/TemplateViewer.jsx";
import Visualizer from "./components/visualizer/Visualizer.jsx";

$('#collapseButton').on('click', function() {
  var dataP = $('#data-viewer');
  var templateV = $('#template-viewer');
  var visualizerW = $("#visualizer");
  var animationDuration = 500;
  var animationEasing = "swing";

  var setCollapse = function(element, shouldCollapse){
    if(shouldCollapse){
      element.addClass("CX");
    }
    else{
      element.removeClass("CX");
    }
  };

  if (dataP.hasClass("CX") && templateV.hasClass("CX")) {

    dataP.animate({ "width": "20%"}, animationDuration, animationEasing, setCollapse(dataP, false));
    templateV.animate({ width: "20%"}, animationDuration, animationEasing, setCollapse(templateV, false));
    visualizerW.animate({width: "60%"});

    } else {

    dataP.animate({ width: "0%"}, animationDuration, animationEasing, setCollapse(dataP, true));
    templateV.animate({ width: "0%"}, animationDuration, animationEasing, setCollapse(templateV, true));
    visualizerW.animate({width: "100%"});
  }
});

