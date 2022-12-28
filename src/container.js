import * as d3 from "d3";
import { addSvgRoot, removeSvgRoot } from "./draw/root";

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
      removeSvgRoot();
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
  const container = document.getElementById(containerId);
  return addSvgRoot(container, dimensions);
}
