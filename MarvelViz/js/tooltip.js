const tooltip = d3.select("#tooltip");

const formatCurrency = value => {
  if (Number.isNaN(value) || value == null) return "n/a";
  return `$${value.toLocaleString(undefined, { maximumFractionDigits: 0 })}m`;
};

const formatPercent = value => {
  if (Number.isNaN(value) || value == null) return "n/a";
  return `${value.toFixed(0)}%`;
};

const getTooltipHtml = data => {
  return `
    <div class="tooltip-title">${data.film} (${data.year})</div>
    <ul class="tooltip-list">
      <li><strong>Franchise</strong><span>${data.category}</span></li>
      <li><strong>Budget</strong><span>${formatCurrency(data.budget)}</span></li>
      <li><strong>Worldwide Gross</strong><span>${formatCurrency(data.worldwideGross)}</span></li>
      <li><strong>Budget Recovered</strong><span>${formatPercent(data.budgetRecovered)}</span></li>
      <li><strong>Critics</strong><span>${formatPercent(data.critics)}</span></li>
      <li><strong>Audience</strong><span>${formatPercent(data.audience)}</span></li>
    </ul>
  `;
};

export function attachTooltip(selection) {
  selection
    .on("pointerenter", function (event, datum) {
      showTooltip(event, datum);
      d3.select(this)
        .select("circle")
        .attr("stroke", "#ffffff")
        .attr("stroke-width", 2);
    })
    .on("pointermove", function (event) {
      moveTooltip(event);
    })
    .on("pointerleave", function () {
      hideTooltip();
      d3.select(this)
        .select("circle")
        .attr("stroke", "none");
    });
}

function showTooltip(event, datum) {
  tooltip
    .html(getTooltipHtml(datum))
    .style("opacity", 1)
    .style("transform", "translateY(0) scale(1)");

  moveTooltip(event);
}

function moveTooltip(event) {
  const pageX = event.pageX;
  const pageY = event.pageY;
  const tooltipNode = tooltip.node();
  if (!tooltipNode) return;

  const padding = 16;
  const tooltipRect = tooltipNode.getBoundingClientRect();
  const offsetX = pageX + padding;
  const offsetY = pageY + padding;
  const maxX = window.innerWidth - tooltipRect.width - padding;
  const maxY = window.innerHeight - tooltipRect.height - padding;

  tooltip.style("left", `${Math.min(offsetX, maxX)}px`);
  tooltip.style("top", `${Math.min(offsetY, maxY)}px`);
}

function hideTooltip() {
  tooltip.style("opacity", 0).style("transform", "translateY(-6px) scale(0.98)");
}
