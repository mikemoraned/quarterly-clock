import * as d3 from "d3";

export function draw(dataModel, svg) {
  const outerMargin = 100;

  const sideLength = Math.min(
    svg.width - outerMargin,
    svg.height - outerMargin
  );
  const clockRadius = sideLength / 2.0;

  const guidesModel = {
    outerRadius: clockRadius,
    remainder: {
      fontSize: `${sideLength / 15}px`,
      box: {
        width: 45 * ((0.5 * sideLength) / 275),
        height: 35 * ((0.5 * sideLength) / 275),
        textY: 30 * ((0.5 * sideLength) / 275),
      },
    },
    info: {
      fontSize: `${sideLength / 5}px`,
      right: {
        x: clockRadius * 0.5,
        y: 0,
      },
    },
    weekScale: {
      fontSize: sideLength / 45,
      //   fontSize: 14,
      yOffset: ((6 / 14) * sideLength) / 45,
    },
  };

  console.dir(guidesModel);

  drawWeekScale(dataModel, guidesModel, svg);
  drawRemainder(dataModel, guidesModel, svg);
  drawDayHand(dataModel, guidesModel, svg);
  drawInfo(dataModel, guidesModel, svg);
  drawGuides(guidesModel, svg);
}

function drawGuides(model, svg) {
  const parentGroup = svg.selection.append("g").attr("id", "guides");

  parentGroup
    .append("circle")
    .attr("class", "guide")
    .attr("cx", 0)
    .attr("cy", 0)
    .attr("r", model.outerRadius)
    .style("fill", "none")
    .style("stroke", "red");

  parentGroup
    .append("circle")
    .attr("class", "guide")
    .attr("cx", model.info.right.x)
    .attr("cy", model.info.right.y)
    .attr("r", 5)
    .style("fill", "red")
    .style("stroke", "red");
}

function drawInfo(dataModel, guidesModel, svg) {
  const parentGroup = svg.selection.append("g").attr("id", "info");

  parentGroup
    .append("text")
    .text(`${dataModel.currentQuarter.label}`)
    .attr("x", guidesModel.info.right.x)
    .attr("y", guidesModel.info.right.y)
    .attr(
      "style",
      `font-size: ${guidesModel.info.fontSize}; dominant-baseline: middle; text-anchor: middle`
    )
    .attr("fill", "black");
}

function drawRemainder(dataModel, guidesModel, svg) {
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

  arcGenerator.innerRadius(50).outerRadius(guidesModel.outerRadius - 35);

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
    .attr("fill", "url(#remainder-pattern)");
}

function drawDayHand(dataModel, guidesModel, svg) {
  const parentGroup = svg.selection.append("g").attr("id", "day-hand");

  parentGroup
    .append("circle")
    .attr("class", "hands-cover")
    .attr("x", 0)
    .attr("y", 0)
    .attr("r", 30);
  const scale = d3.scaleLinear().domain([0, 1]).range([0, 360]);
  parentGroup
    .append("line")
    .attr("class", "day-hand")
    .attr("x1", 0)
    .attr("y1", 0)
    .attr("x2", 0)
    .attr("y2", -1 * guidesModel.outerRadius)
    .attr(
      "transform",
      (d) => `rotate(${scale(dataModel.elapsed.yearFraction)})`
    );
}

function drawWeekScale(dataModel, guidesModel, svg) {
  const parentGroup = svg.selection.append("g").attr("id", "week-scale");

  const tickLength = 15;
  const tickStart = guidesModel.outerRadius - tickLength;

  //   const range = d3.range(1, 53);
  //   const scale = d3.scaleLinear().range([0, 360]).domain([0, 52]);
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
