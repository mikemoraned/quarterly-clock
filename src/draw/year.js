import * as d3 from "d3";

export function drawWeekScale(dataModel, guidesModel, svg) {
  const parentGroup = svg.selection.append("g").attr("id", "week-scale");

  const tickLength = guidesModel.outerRadius / 25;
  const tickStart = guidesModel.outerRadius - tickLength;

  const scale = d3
    .scaleTime()
    .domain([dataModel.startOfYear, dataModel.endOfYear])
    .range([0, 360]);
  parentGroup
    .selectAll(".week-tick")
    .data(dataModel.weeks)
    .enter()
    .append("line")
    .attr("class", "week-tick")
    .attr("stroke-width", guidesModel.outerRadius / 100)
    .attr("x1", 0)
    .attr("x2", 0)
    .attr("y1", tickStart)
    .attr("y2", tickStart + tickLength)
    .attr("transform", (w) => `rotate(${scale(w.start)})`);

  const labelFontSize = guidesModel.weekScale.fontSize;
  const labelYOffset = guidesModel.weekScale.yOffset;
  const labelRadius =
    guidesModel.outerRadius + tickLength / 2.0 + labelFontSize / 2.0;

  parentGroup
    .selectAll(".week-label")
    .data(dataModel.weeks)
    .enter()
    .append("text")
    .attr("class", "week-label")
    .attr("text-anchor", "middle")
    .attr("x", (w) => labelRadius * Math.sin((scale(w.start) * Math.PI) / 180))
    .attr(
      "y",
      (w) =>
        -labelRadius * Math.cos((scale(w.start) * Math.PI) / 180) + labelYOffset
    )
    .attr("style", `font-size: ${labelFontSize}px`)
    .text((w) => w.label);
}

export function drawDayHand(dataModel, guidesModel, svg) {
  const parentGroup = svg.selection.append("g").attr("id", "day-hand");

  parentGroup
    .append("circle")
    .attr("class", "hands-cover")
    .attr("x", 0)
    .attr("y", 0)
    .attr("r", guidesModel.outerRadius / 20);
  const scale = d3.scaleLinear().domain([0, 1]).range([0, 360]);
  parentGroup
    .append("line")
    .attr("class", "day-hand")
    .attr("stroke-width", guidesModel.outerRadius / 50)
    .attr("x1", 0)
    .attr("y1", 0)
    .attr("x2", 0)
    .attr("y2", -1 * guidesModel.outerRadius)
    .attr(
      "transform",
      (d) => `rotate(${scale(dataModel.elapsed.yearFraction)})`
    );
}
