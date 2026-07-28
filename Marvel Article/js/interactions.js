import { showTooltip, moveTooltip, hideTooltip } from "./tooltip.js";

export function attachHoverBehavior(selection, hoverLabel) {
  selection
    .on("mouseenter", function (event, movie) {
      d3.select(this).raise();
      d3.select(this)
        .select("circle")
        .classed("hovered", true)
        .transition()
        .duration(220)
        .attr("r", 10);

      hoverLabel
        .text(movie.film)
        .attr("x", movie.x)
        .attr("y", movie.y - 14)
        .transition()
        .duration(220)
        .style("opacity", 1);

      showTooltip(event, movie);
    })
    .on("mousemove", function (event, movie) {
      moveTooltip(event);
      hoverLabel
        .attr("x", movie.x + 10)
        .attr("y", movie.y - 14);
    })
    .on("mouseleave", function () {
      d3.select(this)
        .select("circle")
        .classed("hovered", false)
        .transition()
        .duration(220)
        .attr("r", 6);

      hoverLabel.transition().duration(180).style("opacity", 0);
      hideTooltip();
    });
}
