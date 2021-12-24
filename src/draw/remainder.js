import * as d3 from "d3";

export function drawRemainder(dataModel, guidesModel, svg) {
  const pattern = svg.root
    .append("defs")
    .append("pattern")
    .attr("id", "remainder-pattern")
    .attr("width", `${guidesModel.remainder.box.width}`)
    .attr("height", `${guidesModel.remainder.box.height}`)
    .attr("patternUnits", "userSpaceOnUse")
    .attr("patternTransform", "rotate(20)");

  pattern
    .append("rect")
    .attr("width", `${guidesModel.remainder.box.width}`)
    .attr("height", `${guidesModel.remainder.box.height}`)
    .attr("fill", "#88AAEE");

  pattern
    .append("text")
    .text(`${dataModel.currentQuarter.wholeWeeksLeft.durationInWeeks}`)
    .attr("x", 0)
    .attr("y", `${guidesModel.remainder.box.textY}`)
    .attr("style", `font-size: ${guidesModel.remainder.fontSize}`)
    .attr("fill", "white");

  const arcGenerator = d3.arc();

  arcGenerator
    .innerRadius(guidesModel.outerRadius / 3)
    .outerRadius(guidesModel.outerRadius - guidesModel.outerRadius / 15);

  const remainderArc = {
    startAngle:
      dataModel.currentQuarter.wholeWeeksLeft.start.yearFraction *
      2.0 *
      Math.PI,
    endAngle:
      dataModel.currentQuarter.wholeWeeksLeft.end.yearFraction * 2.0 * Math.PI,
  };

  const parentGroup = svg.selection.append("g").attr("id", "remainder");

  parentGroup
    .append("path")
    .attr("class", "remainder")
    .attr("d", arcGenerator(remainderArc))
    .attr("fill", "url(#remainder-pattern)")
    .attr("stroke", "black");
}
