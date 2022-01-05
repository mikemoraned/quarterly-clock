import * as d3 from "d3";

const RENDER_DELAY = 200;

export function renderUnder(containerId, callback) {
  window.addEventListener("load", () => {
    const container = document.getElementById(containerId);
    const { width, height } = container.getBoundingClientRect();
    const dimensions = applyBorderAllowance({ width, height });
    const svg = addSvg(containerId, dimensions);
    callback(svg);

    const resizeObserver = new ResizeObserver(() => {
      const { width, height } = container.getBoundingClientRect();
      const dimensions = applyBorderAllowance({ width, height });
      removeSvg(containerId);
      const svg = addSvg(containerId, dimensions);
      callback(svg);
    });

    resizeObserver.observe(container);
  });
}

const BORDER_ALLOWANCE = 5;
function applyBorderAllowance({ width, height }) {
  // add an allowance so that we don't set the full size of the SVG to
  // the same size as the div, which then could cause the parent to change size
  // again
  return {
    width: width - BORDER_ALLOWANCE,
    height: height - BORDER_ALLOWANCE,
  };
}

function addSvg(containerId, dimensions) {
  const { width, height } = dimensions;
  console.log(`container dimensions: ${width}x${height}`);

  const root = d3
    .select(`#${containerId}`)
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

function removeSvg(containerId) {
  d3.select(`#${containerId} > svg#clock`).remove();
}
