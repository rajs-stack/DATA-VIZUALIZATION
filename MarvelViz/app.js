import { loadData } from "./js/data.js";
import { createChart } from "./js/chart.js";
import { setupControls } from "./js/controls.js";

async function init() {
  try {
    const data = await loadData();
    const chart = createChart(data);
    setupControls(chart);
  } catch (error) {
    console.error("Unable to initialize MarvelViz", error);
  }
}

init();
