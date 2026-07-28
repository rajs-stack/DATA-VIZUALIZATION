export function setupControls(chart) {
  const xAxis = document.getElementById("x-axis");
  const yAxis = document.getElementById("y-axis");
  const bubbleSize = document.getElementById("bubble-size");

  if (!chart || !xAxis || !yAxis || !bubbleSize) {
    return;
  }

  const update = () => {
    chart.setState({
      x: xAxis.value,
      y: yAxis.value,
      size: bubbleSize.value,
    });
  };

  xAxis.addEventListener("change", update);
  yAxis.addEventListener("change", update);
  bubbleSize.addEventListener("change", update);
}
