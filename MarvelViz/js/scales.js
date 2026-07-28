import { METRIC_LABELS } from "./data.js";

const clampDomain = (values, factor = 0.06) => {
  const [min, max] = d3.extent(values);
  if (min === undefined || max === undefined) return [0, 1];
  const padding = (max - min) * factor;
  return [min - padding, max + padding];
};

export function createScales(data, state, width, height) {
  const xKey = state.x;
  const yKey = state.y;
  const sizeKey = state.size;

  const xValues = data.map(d => d[xKey]);
  const yValues = data.map(d => d[yKey]);
  const sizeValues = data.map(d => d[sizeKey]);

  const x = d3
    .scaleLinear()
    .domain(clampDomain(xValues))
    .range([0, width])
    .nice();

  const y = d3
    .scaleLinear()
    .domain(clampDomain(yValues))
    .range([height, 0])
    .nice();

  const radius = d3
    .scaleSqrt()
    .domain(d3.extent(sizeValues))
    .range([6, 38]);

  const color = d3
    .scaleOrdinal(d3.schemeTableau10)
    .domain([...new Set(data.map(d => d.category))]);

  return {
    x,
    y,
    radius,
    color,
    xLabel: METRIC_LABELS[xKey] || xKey,
    yLabel: METRIC_LABELS[yKey] || yKey,
    sizeLabel: METRIC_LABELS[sizeKey] || sizeKey,
  };
}
