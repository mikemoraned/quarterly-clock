import * as d3 from "d3";

export function draw(dataModel, svg) {
  const margin = 100;

  const clockRadius = Math.min(svg.width - margin, svg.height - margin) / 2.0;

  const guidesModel = {
    outerRadius: clockRadius,
  };

  drawRemainder(dataModel, guidesModel, svg);
  drawCompleted(dataModel, guidesModel, svg);
  drawDayHand(dataModel, guidesModel, svg);
  drawWeekScale(guidesModel, svg);
  drawGuides(guidesModel, svg);
}

function drawGuides(model, svg) {
  svg.selection
    .append("circle")
    .attr("class", "guide")
    .attr("cx", 0)
    .attr("cy", 0)
    .attr("r", model.outerRadius)
    .style("fill", "none")
    .style("stroke", "red");
}

function drawRemainder(dataModel, guidesModel, svg) {
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

  arcGenerator.innerRadius(50).outerRadius(dataModel.outerRadius - 35);

  const remainderArc = {
    startAngle: guidesModel.yearFraction * 2.0 * Math.PI,
    endAngle: 0.75 * 2.0 * Math.PI,
  };

  svg.selection
    .append("path")
    .attr("class", "remainder")
    .attr("d", arcGenerator(remainderArc))
    .attr("fill", "url(#remainder-pattern)");
}

function drawCompleted(dataModel, guidesModel, svg) {
  const arcGenerator = d3.arc();

  arcGenerator.innerRadius(50).outerRadius(guidesModel.outerRadius - 35);

  const angles = [
    0,
    0.5 * Math.PI,
    Math.PI,
    dataModel.yearFraction * 2.0 * Math.PI,
  ];
  const arcs = [
    { label: "Q1", startAngle: angles[0], endAngle: angles[1] },
    { label: "Q2", startAngle: angles[1], endAngle: angles[2] },
    { label: "Q3", startAngle: angles[2], endAngle: angles[3] },
  ];
  const labelFontSize = 40;
  arcs.forEach((arc) => {
    svg.selection
      .append("path")
      .attr("class", "completed")
      .attr("d", arcGenerator(arc))
      .attr("id", (d) => {
        return "uniqueId_" + arc.label;
      })
      .attr("fill", "lightgray")
      .attr("stroke-width", "4")
      .attr("stroke", "gray");
    const centroid = arcGenerator.centroid(arc);
    svg.selection
      .append("text")
      .attr("class", "quarterly-label")
      .attr("style", `font-size: ${labelFontSize}px`)
      .attr("text-anchor", "middle")
      .attr("x", `${labelFontSize * 1.5}`)
      .attr("dy", "1em")
      .append("textPath")
      .attr("xlink:href", function (d) {
        return "#uniqueId_" + arc.label;
      })
      .text(arc.label);
  });
}

function drawDayHand(dataModel, guidesModel, svg) {
  svg.selection
    .append("circle")
    .attr("class", "hands-cover")
    .attr("x", 0)
    .attr("y", 0)
    .attr("r", 40);
  const scale = d3.scaleLinear().domain([0, 1]).range([0, 360]);
  svg.selection
    .append("line")
    .attr("class", "day-hand")
    .attr("x1", 0)
    .attr("y1", 0)
    .attr("x2", 0)
    .attr("y2", -1 * guidesModel.outerRadius)
    .attr("transform", (d) => `rotate(${scale(dataModel.yearFraction)})`);
  const labelFontSize = 40;
  svg.selection
    .append("text")
    .attr("class", "quarterly-label")
    .attr("style", `font-size: ${labelFontSize}px`)
    .attr("text-anchor", "middle")
    .attr("x", 0)
    .attr("y", 0)
    .attr("dy", "0.3em")
    .text("Q3");
}

function drawWeekScale(guidesModel, svg) {
  const tickLength = 15;
  const tickStart = guidesModel.outerRadius - tickLength;

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
  const labelRadius =
    guidesModel.outerRadius + tickLength / 2.0 + labelFontSize / 2.0;

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
