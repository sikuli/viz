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
  if (dataP.css("visibility") == "collapse" && templateV.css("visibility") == "collapse") {
        visualizerW.switchClass("col-md-12", "col-md-8" , 500, 'swing', function () { 
            dataP.animate({ opacity: "1.0" }, 500, function () {
                dataP.css("visibility", "visible").css("display", "block");
            });
            templateV.animate({ opacity: "1.0" }, 500, function () {
                templateV.css("visibility", "visible").css("display", "block");
            });
        });
    } else {
        setTimeout( function () { visualizerW.switchClass("col-md-8", "col-md-12" , 500) }, 1000);
        dataP.animate({ opacity: "0.0" }, 500, function () {
            dataP.css("visibility", "collapse").css("display", "none");
        });
        templateV.animate({ opacity: "0.0" }, 500, function () {
            templateV.css("visibility", "collapse").css("display", "none");
        });
  }
});

