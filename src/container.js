import * as d3 from "d3";

export function svg(containerId) {
  const container = document.getElementById(containerId);
  const { width, height } = container.getBoundingClientRect();

  const root = d3
    .select(`#${containerId}`)
    .append("svg")
    .attr("class", "clock")
    .attr("width", width)
    .attr("height", height);

  const shiftToCenter = `translate(${width / 2.0} ${height / 2.0})`;
  const topLevelGroup = root.append("g").attr("transform", shiftToCenter);

  return {
    width,
    height,
    root,
    selection: topLevelGroup,
  };
}
