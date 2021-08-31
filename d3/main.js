import * as d3 from "d3";

const startOfYear = d3.timeYear();
const startOfDay = d3.timeDay();
const wholeWeeksSoFar = d3.timeWeek.count(startOfYear, startOfDay);
console.log(startOfYear, startOfDay, wholeWeeksSoFar);

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

function draw(wholeWeeksSoFar, svg) {
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

  drawRemainder(clockRadius, wholeWeeksSoFar / 52.0, svg);
  drawCompleted(clockRadius, (wholeWeeksSoFar - 1) / 52.0, svg);
  drawDayHand(clockRadius, wholeWeeksSoFar / 52.0, svg);
  drawWeekScale(clockRadius, svg);
}

function drawRemainder(clockRadius, yearFraction, svg) {
  const pattern = svg.root
    .append("defs")
    .append("pattern")
    .attr("id", "remainder-pattern")
    .attr("width", "45")
    .attr("height", "35")
    .attr("patternUnits", "userSpaceOnUse")
    .attr("patternTransform", "rotate(20)");

  pattern
    .append("rect")
    .attr("width", "45")
    .attr("height", "35")
    .attr("transform", "translate(0,0)")
    .attr("fill", "#88AAEE");

  pattern
    .append("text")
    .text("4")
    .attr("x", 0)
    .attr("y", 30)
    .attr("style", "font: 30px Courier")
    .attr("fill", "white");

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

function drawCompleted(clockRadius, yearFraction, svg) {
  const arcGenerator = d3.arc();

  arcGenerator.innerRadius(50).outerRadius(clockRadius - 35);

  const angles = [0, 0.5 * Math.PI, Math.PI, yearFraction * 2.0 * Math.PI];
  const arcs = [
    { label: "Q1", startAngle: angles[0], endAngle: angles[1] },
    { label: "Q2", startAngle: angles[1], endAngle: angles[2] },
    { label: "Q3", startAngle: angles[2], endAngle: angles[3] },
  ];
  const labelFontSize = 80;
  arcs.forEach((arc) => {
    svg.selection
      .append("path")
      .attr("class", "completed")
      .attr("d", arcGenerator(arc))
      .attr("fill", "lightgray")
      .attr("stroke-width", "4")
      .attr("stroke", "gray");
    const centroid = arcGenerator.centroid(arc);
    svg.selection
      .append("text")
      .attr("class", "quarterly-label")
      .attr("style", `font-size: ${labelFontSize}px`)
      .attr("text-anchor", "middle")
      .attr("x", centroid[0])
      .attr("y", centroid[1])
      .attr("dy", "0.5em")
      .text(arc.label);
  });
}

function drawDayHand(clockRadius, yearFraction, svg) {
  svg.selection
    .append("circle")
    .attr("class", "hands-cover")
    .attr("x", 0)
    .attr("y", 0)
    .attr("r", clockRadius / 20);
  const scale = d3.scaleLinear().domain([0, 1]).range([0, 360]);
  svg.selection
    .append("line")
    .attr("class", "day-hand")
    .attr("x1", 0)
    .attr("y1", 0)
    .attr("x2", 0)
    .attr("y2", -clockRadius)
    .attr("transform", (d) => `rotate(${scale(yearFraction)})`);
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
    .text((d) => `W${d}`);
}

draw(wholeWeeksSoFar, svg());
