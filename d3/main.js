import * as d3 from "d3";

const startOfYear = d3.timeYear();
const startOfDay = d3.timeDay();
const wholeWeeksSoFar = d3.timeWeek.count(startOfYear, startOfDay);
console.log(startOfYear, startOfDay, wholeWeeksSoFar);

function canvas() {
  const container = document.getElementById("container");
  const { width, height } = container.getBoundingClientRect();

  var canvas = document.getElementById("clock");
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;

  const context = canvas.getContext("2d");
  const scale = window.devicePixelRatio;
  canvas.width = Math.floor(width * scale);
  canvas.height = Math.floor(height * scale);
  context.scale(scale, scale);

  return {
    width,
    height,
    context,
  };
}

function draw(wholeWeeksSoFar, canvas) {
  const yearFraction = wholeWeeksSoFar / 52.0;
  console.log(yearFraction);

  const { width, height, context } = canvas;

  const radius = (0.9 * Math.min(width, height)) / 2.0;

  const arcGenerator = d3.arc().context(context);

  arcGenerator.innerRadius(0).outerRadius(radius);

  const yearSoFarArc = {
    startAngle: 0,
    endAngle: yearFraction * 2.0 * Math.PI,
  };

  const remainderArc = {
    startAngle: yearFraction * 2.0 * Math.PI,
    endAngle: 0.75 * 2.0 * Math.PI,
  };

  //   context.fillStyle = "blue";
  //   context.fillRect(0, 0, width, height);

  context.translate(width / 2.0, height / 2.0);

  context.lineCap = "round";
  context.lineJoin = "round";
  context.lineWidth = 5;
  context.lineDashOffset = 4;
  context.setLineDash([4, 16]);
  context.beginPath();
  arcGenerator(remainderArc);
  context.stroke();
  context.fillStyle = patternBackground("5");
  context.beginPath();
  arcGenerator(remainderArc);
  context.fill();

  context.lineDashOffset = 0;
  context.setLineDash([]);
  context.fillStyle = "white";
  context.beginPath();
  arcGenerator(yearSoFarArc);
  context.fill();
  context.lineCap = "round";
  context.lineJoin = "round";
  context.lineWidth = 10;
  context.strokeStyle = "black";
  context.beginPath();
  arcGenerator(yearSoFarArc);
  context.stroke();
}

function patternBackground(text) {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  canvas.width = 65;
  canvas.height = 50;
  context.fillStyle = "lightgray";
  context.fillRect(0, 0, canvas.width, canvas.height);
  const patternTextHeight = 50 * 0.7;
  context.font = `${patternTextHeight}px Courier`;
  context.fillStyle = "white";
  context.fillText(`${text}`, 20, 40 + patternTextHeight / 4.0);

  const pattern = context.createPattern(canvas, "repeat");

  return pattern;
}

function svg() {
  const container = document.getElementById("container");
  const { width, height } = container.getBoundingClientRect();

  const root = d3
    .select("#container")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

  const shiftToCenter = `translate(${width / 2.0} ${height / 2.0})`;
  const topLevelGroup = root.append("g").attr("transform", shiftToCenter);

  return {
    width,
    height,
    selection: topLevelGroup,
  };
}

function drawSVG(wholeWeeksSoFar, svg) {
  const clockRadius = (0.9 * Math.min(svg.width, svg.height)) / 2.0;

  svg.selection
    .append("circle")
    .attr("class", "scaffold")
    .attr("cx", 0)
    .attr("cy", 0)
    .attr("r", clockRadius)
    .style("fill", "white")
    .style("stroke", "red");

  const weekTickLength = 10;
  const weekTickStart = clockRadius - weekTickLength;

  const weekRange = d3.range(0, 52);
  const weekScale = d3.scaleLinear().range([0, 360]).domain([0, 52]);
  svg.selection
    .selectAll(".week-tick")
    .data(weekRange)
    .enter()
    .append("line")
    .attr("class", "week-tick")
    .attr("x1", 0)
    .attr("x2", 0)
    .attr("y1", weekTickStart)
    .attr("y2", weekTickStart + weekTickLength)
    .attr("transform", (d) => `rotate(${weekScale(d)})`);
}

// draw(wholeWeeksSoFar, canvas());
drawSVG(wholeWeeksSoFar, svg());
