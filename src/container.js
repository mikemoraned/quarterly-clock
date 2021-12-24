import * as d3 from "d3";

export function svgUnder(containerId, callback) {
  window.addEventListener("load", () => {
    const container = document.getElementById(containerId);
    const { width, height } = container.getBoundingClientRect();
    const dimensions = { width, height };
    const svg = createSvg(containerId, dimensions);
    callback(svg);
  });
}

function createSvg(containerId, dimensions) {
  const { width, height } = dimensions;
  console.log(`container dimensions: ${width}x${height}`);

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
