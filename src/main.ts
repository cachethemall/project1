//import 'https://unpkg.com/bootstrap/dist/css/bootstrap.min.css'
// import 'https://unpkg.com/bootstrap/dist/js/bootstrap.bundle.min.js'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import { mainMenu } from "./mainMenu";
import { showChart } from "./chartLib";
import { render } from 'solid-js/web';
import h from "solid-js/h";

async function StartUp() {
  let dataJson = await fetch("./data.json").then((response) => response.text());

  showChart(dataJson);
  console.log("abc1");
}

// StartUp();
// exampleApexCharts();

// @ts-ignore
render(h(mainMenu), document.getElementById("appContainer")!);
