import * as d3 from "d3";

export function drawCurrentQuarter(dataModel, guidesModel, svg) {
  const arcGenerator = d3.arc();

  arcGenerator
    .innerRadius(guidesModel.outerRadius / 6)
    .outerRadius(guidesModel.outerRadius - guidesModel.outerRadius / 4);

  const arc = {
    startAngle: dataModel.currentQuarter.start.yearFraction * 2.0 * Math.PI,
    endAngle: dataModel.currentQuarter.end.yearFraction * 2.0 * Math.PI,
  };

  const parentGroup = svg.selection.append("g").attr("id", "current-quarter");

  parentGroup
    .append("path")
    .attr("class", "current-quarter")
    .attr("d", arcGenerator(arc))
    .attr("fill", "lightgray")
    .attr("stroke", "black");
}

export function drawQuarterLabel(dataModel, guidesModel, svg) {
  const parentGroup = svg.selection.append("g").attr("id", "info");

  const positionForQuarterIndex = [
    guidesModel.info.left,
    guidesModel.info.left,
    guidesModel.info.right,
    guidesModel.info.right,
  ];

  const position = positionForQuarterIndex[dataModel.currentQuarter.index];

  parentGroup
    .append("text")
    .text(`${dataModel.currentQuarter.label}`)
    .attr("x", position.x)
    .attr("y", position.y)
    .attr(
      "style",
      `font-size: ${guidesModel.info.fontSize}; dominant-baseline: middle; text-anchor: middle`
    )
    .attr("fill", "lightgray")
    .attr("stroke", "black");
}
