import * as d3 from "d3";
import { defaultPositionRounding as dpr, defaultArcGenerator } from "./standard";

export function drawCurrentQuarter(dataModel, guidesModel, svg) {
  const arcGenerator = d3.arc();

  console.log("D3 version:", d3.version);

  arcGenerator
    .innerRadius(guidesModel.outerRadius / 6)
    .outerRadius(guidesModel.outerRadius - guidesModel.outerRadius / 4)
    .digits(2);

  const arc = {
    startAngle: dataModel.currentQuarter.start.yearFraction * 2.0 * Math.PI,
    endAngle: dataModel.currentQuarter.end.yearFraction * 2.0 * Math.PI,
  };

  const parentGroup = svg.selection.append("g").attr("id", "current-quarter");

  parentGroup
    .append("path")
    .attr("class", "current-quarter")
    .attr("d", arcGenerator(arc))
    .attr(
      "fill",
      guidesModel.colors.quarters[dataModel.currentQuarter.index].color
    )
    .attr("stroke", "none");
}

export function drawAllQuarterContext(dataModel, guidesModel, svg) {
  const arcGenerator = d3.arc();

  arcGenerator
    .innerRadius(guidesModel.outerRadius / 6)
    .outerRadius(guidesModel.outerRadius - 0.7 * guidesModel.outerRadius);

  const arcs = [
    {
      startAngle: 0,
      endAngle: 0.5 * Math.PI,
      color: guidesModel.colors.quarters[0].color,
    },
    {
      startAngle: 0.5 * Math.PI,
      endAngle: Math.PI,
      color: guidesModel.colors.quarters[1].color,
    },
    {
      startAngle: Math.PI,
      endAngle: 1.5 * Math.PI,
      color: guidesModel.colors.quarters[2].color,
    },
    {
      startAngle: 1.5 * Math.PI,
      endAngle: 2.0 * Math.PI,
      color: guidesModel.colors.quarters[3].color,
    },
  ];

  const parentGroup = svg.selection.append("g").attr("id", "all-quarters");

  arcs.forEach((arc) => {
    parentGroup
      .append("path")
      .attr("d", arcGenerator(arc))
      .attr("fill", arc.color)
      .attr("stroke", "none");
  });
}

export function drawQuarterLabel(dataModel, guidesModel, svg) {
  const parentGroup = svg.selection.append("g").attr("id", "info");

  const positionForQuarterIndex = [
    guidesModel.quarterLabel.left,
    guidesModel.quarterLabel.left,
    guidesModel.quarterLabel.right,
    guidesModel.quarterLabel.right,
  ];

  const position = positionForQuarterIndex[dataModel.currentQuarter.index];

  parentGroup
    .append("text")
    .text(`${dataModel.currentQuarter.label}`)
    .attr("x", position.x)
    .attr("y", position.y)
    .attr(
      "style",
      `font-size: ${guidesModel.quarterLabel.fontSize}; dominant-baseline: text-bottom; text-anchor: left`
    )
    .attr(
      "fill",
      guidesModel.colors.quarters[dataModel.currentQuarter.index].color
    )
    .attr("stroke", "none");
}
