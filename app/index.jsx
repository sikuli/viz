import Header from "./components/header/Header.jsx";
import Footer from "./components/footer/Footer.jsx";
import DataViewer from "./components/data-viewer/DataViewer.jsx";
import TemplateViewer from "./components/template-viewer/TemplateViewer.jsx";
import Visualizer from "./components/visualizer/Visualizer.jsx";

$("#collapse-button").on("click", function() {
  var dataP = $("#data-viewer");
  var templateV = $("#template-viewer");
  var visualizerW = $("#visualizer");
  var animationDuration = 400;
  var animationEasing = "swing";

  var setCollapse = function(element, shouldCollapse){
    if(shouldCollapse){
      element.addClass("panel-collapsed");
    }
    else{
      element.removeClass("panel-collapsed");
    }
  };

  if (dataP.hasClass("panel-collapsed") && templateV.hasClass("panel-collapsed")) {

    dataP.animate(
      { "width": "20%", opacity: "1.0"},
      animationDuration,
      animationEasing,
      setCollapse(dataP, false)
    );
    templateV.animate(
      { width: "20%", opacity: "1.0"},
      animationDuration,
      animationEasing,
      setCollapse(templateV, false)
    );
    visualizerW.animate({width: "60%"});
    $("#collapse-button").text("Collapse");

    } else {

      dataP.animate(
        { width: "0%", opacity: "0.0"},
        animationDuration,
        animationEasing,
        setCollapse(dataP, true)
      );
      templateV.animate(
        { width: "0%", opacity: "0.0"},
        animationDuration,
        animationEasing,
        setCollapse(templateV, true)
      );
    visualizerW.animate({width: "100%"});
    $("#collapse-button").text("Expand");
  }
});
