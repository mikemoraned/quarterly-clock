import * as d3 from "d3";

export function addSvgRoot(parentNode, dimensions) {
  const { width, height } = dimensions;
  console.log(`parent dimensions: ${width}x${height}`);

  const root = d3
    .select(parentNode)
    .append("svg")
    .attr("id", "clock")
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

export function removeSvgRoot() {
  d3.select(`svg#clock`).remove();
}
