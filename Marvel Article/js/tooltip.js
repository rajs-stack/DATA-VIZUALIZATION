import * as d3 from "https://unpkg.com/d3@7?module";

const tooltip = d3.select("#tooltip");

const formatMoney = (value) => {
  if (value == null || Number.isNaN(value)) return "n/a";
  return `$${value.toLocaleString(undefined, { maximumFractionDigits: 0 })}m`;
};

const formatPercent = (value) => {
  if (value == null || Number.isNaN(value)) return "n/a";
  return `${value.toFixed(0)}%`;
};

export function showTooltip(event, movie) {
  tooltip
    .html(`
      <div><strong>${movie.film}</strong></div>
      <div class="line"><strong>Worldwide Gross</strong><span>${formatMoney(movie.worldwideGross)}</span></div>
      <div class="line"><strong>% Budget Recovered</strong><span>${formatPercent(movie.budgetRecovered)}</span></div>
      <div class="line"><strong>Critics % Score</strong><span>${formatPercent(movie.critics)}</span></div>
      <div class="line"><strong>Audience % Score</strong><span>${formatPercent(movie.audience)}</span></div>
      <div class="line"><strong>Budget</strong><span>${formatMoney(movie.budget)}</span></div>
      <div class="line"><strong>% Gross from Domestic</strong><span>${formatPercent(movie.domesticPercent)}</span></div>
      <div class="line"><strong>% Gross from International</strong><span>${formatPercent(movie.internationalPercent)}</span></div>
    `)
    .classed("visible", true)
    .attr("aria-hidden", "false");

  moveTooltip(event);
}

export function hideTooltip() {
  tooltip.classed("visible", false).attr("aria-hidden", "true");
}

export function moveTooltip(event) {
  const { pageX: x, pageY: y } = event;
  const tooltipNode = tooltip.node();
  if (!tooltipNode) return;

  const { width, height } = tooltipNode.getBoundingClientRect();
  const pageWidth = document.documentElement.clientWidth;
  const offsetX = x + 18;
  const maxX = pageWidth - width - 16;
  const left = Math.min(offsetX, maxX);
  const top = y + 18;

  tooltip.style("left", `${left}px`).style("top", `${top}px`);
}
