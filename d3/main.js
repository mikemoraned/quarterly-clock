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

function drawSVG(wholeWeeksSoFar, svg) {
  const yearFraction = wholeWeeksSoFar / 52.0;

  const margin = 100;
  const clockRadius = Math.min(svg.width - margin, svg.height - margin) / 2.0;

  svg.selection
    .append("circle")
    .attr("class", "scaffold")
    .attr("cx", 0)
    .attr("cy", 0)
    .attr("r", clockRadius)
    .style("fill", "white")
    .style("stroke", "red");

  drawRemainder(clockRadius, yearFraction, svg);
  drawWeekScale(clockRadius, svg);
  drawQuarterlyScale(clockRadius, svg);
}

function drawRemainder(clockRadius, yearFraction, svg) {
  const pattern = svg.root
    .append("defs")
    .append("pattern")
    .attr("id", "remainder-pattern")
    .attr("width", "8")
    .attr("height", "8")
    .attr("patternUnits", "userSpaceOnUse")
    .attr("patternTransform", "rotate(30)")
    .append("rect")
    .attr("width", "4")
    .attr("height", "8")
    .attr("transform", "translate(0,0)")
    .attr("fill", "#88AAEE");

  const arcGenerator = d3.arc();

  arcGenerator.innerRadius(50).outerRadius(clockRadius - 35);

  const remainderArc = {
    startAngle: yearFraction * 2.0 * Math.PI,
    endAngle: 0.75 * 2.0 * Math.PI,
  };

  svg.selection
    .append("path")
    .attr("class", "remainder")
    .attr("d", arcGenerator(remainderArc))
    .attr("fill", "url(#remainder-pattern)");
}

function drawWeekScale(clockRadius, svg) {
  const tickLength = 15;
  const tickStart = clockRadius - tickLength;

  const range = d3.range(1, 53);
  const scale = d3.scaleLinear().range([0, 360]).domain([0, 52]);
  svg.selection
    .selectAll(".week-tick")
    .data(range)
    .enter()
    .append("line")
    .attr("class", "week-tick")
    .attr("x1", 0)
    .attr("x2", 0)
    .attr("y1", tickStart)
    .attr("y2", tickStart + tickLength)
    .attr("transform", (d) => `rotate(${scale(d)})`);

  const labelFontSize = 14;
  const labelYOffset = 6;
  const labelRadius = clockRadius + tickLength / 2.0 + labelFontSize / 2.0;

  svg.selection
    .selectAll(".week-label")
    .data(range)
    .enter()
    .append("text")
    .attr("class", "week-label")
    .attr("text-anchor", "middle")
    .attr("x", (d) => labelRadius * Math.sin((scale(d) * Math.PI) / 180))
    .attr(
      "y",
      (d) => -labelRadius * Math.cos((scale(d) * Math.PI) / 180) + labelYOffset
    )
    .attr("style", `font-size: ${labelFontSize}px`)
    .text((d) => d);
}

function drawQuarterlyScale(clockRadius, svg) {
  const tickLength = 30;
  const tickStart = clockRadius - tickLength;

  const range = d3.range(1, 5);
  const scale = d3.scaleLinear().range([0, 360]).domain([0, 4]);
  svg.selection
    .selectAll(".quarterly-tick")
    .data(range)
    .enter()
    .append("line")
    .attr("class", "quarterly-tick")
    .attr("x1", 0)
    .attr("x2", 0)
    .attr("y1", tickStart)
    .attr("y2", tickStart + tickLength)
    .attr("transform", (d) => `rotate(${scale(d)})`);

  const labelFontSize = 28;
  const labelYOffset = 10;
  const labelRadius = clockRadius - tickLength - labelFontSize;

  svg.selection
    .selectAll(".quarterly-label")
    .data(range)
    .enter()
    .append("text")
    .attr("class", "quarterly-label")
    .attr("text-anchor", "middle")
    .attr("x", (d) => labelRadius * Math.sin((scale(d) * Math.PI) / 180))
    .attr(
      "y",
      (d) => -labelRadius * Math.cos((scale(d) * Math.PI) / 180) + labelYOffset
    )
    .attr("style", `font-size: ${labelFontSize}px`)
    .text((d) => `Q${d}`);
}
// draw(wholeWeeksSoFar, canvas());
drawSVG(wholeWeeksSoFar, svg());
