import { attachHoverBehavior } from "./interactions.js";

const margin = { top: 32, right: 30, bottom: 48, left: 68 };
const pointRadius = 6;

export class ScatterChart {
  constructor(container, data) {
    this.container = d3.select(container);
    this.data = data;
    this.initialize();
  }

  initialize() {
    this.svg = this.container
      .append("svg")
      .attr("class", "chart-svg");

    this.plot = this.svg.append("g").attr("class", "plot-area");
    this.xAxisGroup = this.plot.append("g").attr("class", "axis x-axis");
    this.yAxisGroup = this.plot.append("g").attr("class", "axis y-axis");
    this.gridGroup = this.plot.append("g").attr("class", "grid-group");
    this.dotsGroup = this.plot.append("g").attr("class", "dots-group");
    this.labelLayer = this.plot.append("text").attr("class", "hover-label").style("opacity", 0);

    this.render();
    window.addEventListener("resize", () => this.render());
  }

  render() {
    const containerRect = this.container.node().getBoundingClientRect();
    const width = Math.max(320, containerRect.width);
    const height = Math.max(320, containerRect.height || 560);

    this.width = width - margin.left - margin.right;
    this.height = height - margin.top - margin.bottom;

    this.svg.attr("width", width).attr("height", height);
    this.plot.attr("transform", `translate(${margin.left},${margin.top})`);

    this.updateScales();
    this.drawGrid();
    this.drawAxes();
    this.drawDots();
  }

  updateScales() {
    const dates = this.data.map((d) => d.releasedAt);
    const yValues = this.data.map((d) => d.budgetRecovered);

    const minDate = d3.min(dates);
    const maxDate = d3.max(dates);
    const minY = Math.max(0, d3.min(yValues) - 12);
    const maxY = d3.max(yValues) + 12;

    this.xScale = d3
      .scaleTime()
      .domain([minDate, maxDate])
      .range([0, this.width])
      .nice();

    this.yScale = d3
      .scaleLinear()
      .domain([minY, maxY])
      .range([this.height, 0])
      .nice();
  }

  drawGrid() {
    const gridLines = this.gridGroup.selectAll("line.grid-line").data(this.yScale.ticks(7), (d) => d);

    gridLines
      .enter()
      .append("line")
      .attr("class", "grid-line")
      .attr("x1", 0)
      .attr("x2", this.width)
      .attr("y1", (d) => this.yScale(d))
      .attr("y2", (d) => this.yScale(d))
      .style("stroke-opacity", 0)
      .transition()
      .duration(360)
      .style("stroke-opacity", 1);

    gridLines
      .transition()
      .duration(360)
      .attr("x2", this.width)
      .attr("y1", (d) => this.yScale(d))
      .attr("y2", (d) => this.yScale(d));

    gridLines.exit().remove();
  }

  drawAxes() {
    const xAxis = d3.axisBottom(this.xScale).ticks(d3.timeYear.every(2)).tickFormat(d3.timeFormat("%Y"));
    const yAxis = d3.axisLeft(this.yScale).ticks(6).tickFormat((d) => `${d}%`);

    this.xAxisGroup
      .attr("transform", `translate(0, ${this.height})`)
      .transition()
      .duration(360)
      .call(xAxis)
      .call((g) => g.selectAll(".domain").remove())
      .call((g) => g.selectAll(".tick line").attr("stroke-opacity", 0.16));

    this.yAxisGroup
      .transition()
      .duration(360)
      .call(yAxis)
      .call((g) => g.selectAll(".domain").remove())
      .call((g) => g.selectAll(".tick line").attr("stroke-opacity", 0.16));

    const xLabel = this.xAxisGroup.selectAll(".axis-title-x").data([null]);
    xLabel
      .join("text")
      .attr("class", "axis-title axis-title-x")
      .attr("x", this.width / 2)
      .attr("y", 44)
      .attr("text-anchor", "middle")
      .text("Movie release date (timeline)");

    const yLabel = this.yAxisGroup.selectAll(".axis-title-y").data([null]);
    yLabel
      .join("text")
      .attr("class", "axis-title axis-title-y")
      .attr("transform", "rotate(-90)")
      .attr("x", -this.height / 2)
      .attr("y", -52)
      .attr("text-anchor", "middle")
      .text("% Budget Recovered");
  }

  drawDots() {
    const dots = this.dotsGroup.selectAll("g.dot-group").data(this.data, (d) => d.film);
    const dotsEnter = dots.enter().append("g").attr("class", "dot-group");

    dotsEnter
      .append("circle")
      .attr("class", "dot")
      .attr("r", 0)
      .attr("cx", (d) => (d.x = this.xScale(d.releasedAt)))
      .attr("cy", (d) => (d.y = this.yScale(d.budgetRecovered)))
      .transition()
      .duration(420)
      .attr("r", pointRadius);

    dotsEnter.merge(dots).attr("transform", (d) => `translate(${d.x}, ${d.y})`);

    dots
      .select("circle")
      .transition()
      .duration(360)
      .attr("cx", 0)
      .attr("cy", 0);

    const merged = dotsEnter.merge(dots);
    attachHoverBehavior(merged, this.labelLayer);

    dots.exit().remove();
  }
}

export function createChart(selector, data) {
  return new ScatterChart(selector, data);
}
