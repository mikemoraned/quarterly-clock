import * as d3 from "d3";

export async function createSvg(containerId) {
  const { width, height } = await getContainerDimensions(containerId);
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

const POLL_INTERVAL = 500;
const MAX_ATTEMPTS = 4;

export async function getContainerDimensions(containerId, attemptsRemaining) {
  attemptsRemaining =
    attemptsRemaining == undefined ? MAX_ATTEMPTS : attemptsRemaining - 1;
  const container = document.getElementById(containerId);
  const { width, height } = container.getBoundingClientRect();

  if (width == 0 || height == 0) {
    if (attemptsRemaining > 0) {
      console.log(
        `width or height not set: ${width}x${height}, will retry after ${POLL_INTERVAL} millis, attempts remaining: ${attemptsRemaining}`
      );
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(getContainerDimensions(containerId, attemptsRemaining));
        }, POLL_INTERVAL);
      });
    } else {
      throw `width or height not set: ${width}x${height}, but ran out of attempts`;
    }
  } else {
    return { width, height };
  }
}
