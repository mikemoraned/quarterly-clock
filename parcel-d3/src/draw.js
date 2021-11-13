export function draw(dataModel, svg) {
  const margin = 100;

  const clockRadius = Math.min(svg.width - margin, svg.height - margin) / 2.0;

  const guidesModel = {
    outerRadius: clockRadius,
  };

  drawGuides(guidesModel, svg);
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
