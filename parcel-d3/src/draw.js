import * as d3 from "d3";

export function draw(dataModel, svg) {
  const margin = 100;

  const clockRadius = Math.min(svg.width - margin, svg.height - margin) / 2.0;

  const guidesModel = {
    outerRadius: clockRadius,
  };

  drawGuides(guidesModel, svg);
  drawWeekScale(guidesModel, svg);
}

function drawGuides(model, svg) {
  svg.selection
    .append("circle")
    .attr("class", "guide")
    .attr("cx", 0)
    .attr("cy", 0)
    .attr("r", model.outerRadius)
    .style("fill", "white")
    .style("stroke", "red");
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
