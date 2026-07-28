export function renderLegend(containerId, categories, colorScale) {
  const container = d3.select(containerId);
  if (container.empty()) return;

  const items = container.selectAll(".legend-item").data(categories, d => d);

  const enter = items.enter().append("div").attr("class", "legend-item");

  enter
    .append("span")
    .attr("class", "legend-swatch")
    .style("background", d => colorScale(d));

  enter
    .append("span")
    .attr("class", "legend-text")
    .text(d => d);

  items
    .select(".legend-swatch")
    .style("background", d => colorScale(d));

  items.exit().remove();
}
