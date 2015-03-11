import Header from "./components/header/Header.jsx";
import Footer from "./components/footer/Footer.jsx";
import DataViewer from "./components/data-viewer/DataViewer.jsx";
import TemplateViewer from "./components/template-viewer/TemplateViewer.jsx";
import Visualizer from "./components/visualizer/Visualizer.jsx";

React.render(
  <Header />,
  document.getElementByClass("header")
);

React.render(
  <Footer />,
  document.getElementByClass("footer")
);

React.render(
  <DataViewer />,
  document.getElementByClass("data-viewer")
);

React.render(
  <TemplateViewer />,
  document.getElementByClass("template-viewer")
);

React.render(
  <Visualizer />,
  document.getElementByClass("visualizer")
);
