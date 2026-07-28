import { loadMovieData } from "./data.js";
import { createChart } from "./chart.js";

async function init() {
  const data = await loadMovieData();
  // create chart (chart will append SVG inside #viz-placeholder)
  const chart = createChart("#viz-placeholder", data);
  return chart;
}

init().catch((error) => {
  console.error("Failed to initialize visualization", error);
});
