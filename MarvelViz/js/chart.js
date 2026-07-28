import { createScales } from "./scales.js";
import { drawAxes } from "./axes.js";
import { attachTooltip } from "./tooltip.js";
import { renderLegend } from "./legend.js";

export class MarvelChart {
  constructor(selector, data) {
    this.selector = selector;
    this.data = data;
    this.state = {
      x: "year",
      y: "budgetRecovered",
      size: "worldwideGross",
    };
    this.margin = { top: 34, right: 54, bottom: 86, left: 90 };

    this.svg = d3.select(selector);
    this.root = this.svg.append("g").attr("class", "chart-root");
    this.gridLayer = this.root.append("g").attr("class", "grid-layer");
    this.axisLayer = this.root.append("g").attr("class", "axis-layer");
    this.bubbleLayer = this.root.append("g").attr("class", "bubble-layer");

    this.xAxisGroup = this.axisLayer.append("g").attr("class", "x-axis");
    this.yAxisGroup = this.axisLayer.append("g").attr("class", "y-axis");

    window.addEventListener("resize", () => this.render());
  }

  render() {
    const rect = this.svg.node().getBoundingClientRect();
    this.width = rect.width - this.margin.left - this.margin.right;
    this.height = rect.height - this.margin.top - this.margin.bottom;

    this.svg.attr("width", rect.width).attr("height", rect.height);
    this.root.attr("transform", `translate(${this.margin.left}, ${this.margin.top})`);

    this.scales = createScales(this.data, this.state, this.width, this.height);
    drawAxes(this.xAxisGroup, this.yAxisGroup, this.gridLayer, this.scales, this.width, this.height);
    this.drawLegend();
    this.drawBubbles();
  }

  drawLegend() {
    const categories = [...new Set(this.data.map(d => d.category))].sort();
    renderLegend("#legend", categories, this.scales.color);
  }

  drawBubbles() {
    const radiusScale = this.scales.radius;
    const nodes = this.bubbleLayer.selectAll("g.bubble").data(this.data, d => d.film);

    const enter = nodes
      .enter()
      .append("g")
      .attr("class", "bubble")
      .attr("transform", d => this.nodeTransform(d));

    enter
      .append("circle")
      .attr("r", 0)
      .attr("fill", d => this.scales.color(d.category))
      .attr("opacity", 0.86);

    enter
      .append("text")
      .attr("class", "bubble-label")
      .attr("text-anchor", "middle")
      .attr("y", d => -radiusScale(d[this.state.size]) - 8)
      .text(d => this.shortenLabel(d.film));

    const merged = enter.merge(nodes);

    merged
      .transition()
      .duration(900)
      .attr("transform", d => this.nodeTransform(d));

    merged
      .select("circle")
      .transition()
      .duration(900)
      .attr("r", d => radiusScale(d[this.state.size]));

    const labelPositions = this.calculateLabelPlacement(radiusScale);
    merged
      .select("text")
      .transition()
      .duration(900)
      .attr("y", d => labelPositions.get(d.film) - this.scales.y(d[this.state.y]))
      .text(d => this.shortenLabel(d.film));

    attachTooltip(merged);

    nodes.exit().transition().duration(500).style("opacity", 0).remove();
  }

  calculateLabelPlacement(radiusScale) {
    const labelNodes = this.data.map(d => {
      const x = this.scales.x(d[this.state.x]);
      const y = this.scales.y(d[this.state.y]) - radiusScale(d[this.state.size]) - 8;
      return {
        film: d.film,
        x,
        y,
        radius: radiusScale(d[this.state.size]) + 12,
      };
    });

    const simulation = d3
      .forceSimulation(labelNodes)
      .stop()
      .force("x", d3.forceX(d => d.x).strength(0.96))
      .force("y", d3.forceY(d => d.y).strength(0.4))
      .force("collide", d3.forceCollide(d => d.radius).strength(1));

    for (let i = 0; i < 60; i += 1) {
      simulation.tick();
    }

    return new Map(labelNodes.map(d => [d.film, d.y]));
  }

  nodeTransform(d) {
    return `translate(${this.scales.x(d[this.state.x])}, ${this.scales.y(d[this.state.y])})`;
  }

  shortenLabel(label) {
    if (!label) return "";
    const text = label.replace(/[:].*$/, "");
    return text.length > 16 ? `${text.slice(0, 14).trim()}…` : text;
  }

  setState(state) {
    this.state = {
      ...this.state,
      ...state,
    };
    this.render();
  }
}

let chartInstance = null;

export function createChart(data) {
  chartInstance = new MarvelChart("#chart", data);
  chartInstance.render();
  return chartInstance;
}

export function getChart() {
  return chartInstance;
}
