import DonutChartComponent from "./DonutChart/DonutChartComponent.jsx";
import C3TemplateComponent from "./C3Template/C3TemplateComponent.jsx";

var templates = [
  {
    id: 1,
    image: "/public/images/DonutChart.png",
    name: DonutChartComponent,
    description: "A Donut Chart is like a pie chart, but with a big old hole in the middle. You know, like a donut.",
    data: {
      A: 0.2,
      B: 0.2,
      C: 0.2,
      D: 0.2,
      F: 0.2
    },
    dimensions: 2
  },
  {
    id: 2,
    image: "/public/images/LineChart.png",
    name: C3TemplateComponent,
    description: "A generic wrapper for any C3 template. https://c3js.org",
    data: {
      columns: [
        ["data1", 30, 200, 100, 400, 150, 250],
        ["data2", 50, 20, 10, 40, 15, 25]
      ]
    },
    dimensions: 2
  }
];

module.exports = templates;
