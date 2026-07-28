import { loadMovieData } from "./data.js";
import { createChart } from "./chart.js";

async function init() {
  const data = await loadMovieData();
  createChart("#viz-placeholder", data);
}

init().catch((error) => {
  console.error("Failed to initialize visualization", error);
});
