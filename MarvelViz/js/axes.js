export function drawAxes(xAxisGroup, yAxisGroup, gridLayer, scales, width, height) {
  const xAxis = d3
    .axisBottom(scales.x)
    .ticks(Math.max(5, Math.min(10, Math.floor(width / 90))))
    .tickSize(-height)
    .tickPadding(12);

  const yAxis = d3
    .axisLeft(scales.y)
    .ticks(Math.max(5, Math.min(8, Math.floor(height / 70))))
    .tickSize(-width)
    .tickPadding(12);

  xAxisGroup
    .attr("transform", `translate(0, ${height})`)
    .transition()
    .duration(900)
    .call(xAxis)
    .call(g => g.selectAll(".domain").remove())
    .call(g => g.selectAll(".tick line").attr("stroke-opacity", 0.2));

  yAxisGroup
    .transition()
    .duration(900)
    .call(yAxis)
    .call(g => g.selectAll(".domain").remove())
    .call(g => g.selectAll(".tick line").attr("stroke-opacity", 0.2));

  xAxisGroup
    .selectAll(".axis-label")
    .data([scales.xLabel])
    .join("text")
    .attr("class", "axis-label")
    .attr("x", width / 2)
    .attr("y", 48)
    .attr("fill", "#94a3b8")
    .attr("text-anchor", "middle")
    .text(d => d);

  yAxisGroup
    .selectAll(".axis-label")
    .data([scales.yLabel])
    .join("text")
    .attr("class", "axis-label")
    .attr("transform", "rotate(-90)")
    .attr("x", -height / 2)
    .attr("y", -56)
    .attr("fill", "#94a3b8")
    .attr("text-anchor", "middle")
    .text(d => d);

  gridLayer
    .selectAll(".grid-x")
    .data([null])
    .join("g")
    .attr("class", "grid grid-x")
    .attr("transform", `translate(0, ${height})`)
    .call(d3.axisBottom(scales.x).ticks(0).tickSize(0).tickFormat(""));

  gridLayer
    .selectAll(".grid-y")
    .data([null])
    .join("g")
    .attr("class", "grid grid-y")
    .call(d3.axisLeft(scales.y).ticks(0).tickSize(0).tickFormat(""));
}
