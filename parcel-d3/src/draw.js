export function draw(model, svg) {
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
}
