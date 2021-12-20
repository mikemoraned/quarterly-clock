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
      left: {
        x: -1.0 * clockRadius * 0.5,
        y: 0,
      },
      right: {
        x: clockRadius * 0.5,
        y: 0,
      },
    },
    logo: {
      fontSize: `${sideLength / 13}px`,
      top: {
        x: 0,
        y: -1.0 * clockRadius * 0.5,
      },
      bottom: {
        x: 0,
        y: clockRadius * 0.4,
      },
    },
    weekScale: {
      fontSize: sideLength / 45,
      yOffset: ((6 / 14) * sideLength) / 45,
    },
  };

  console.log("Guides Model:", JSON.stringify(guidesModel));

  drawWeekScale(dataModel, guidesModel, svg);
  drawCurrentQuarter(dataModel, guidesModel, svg);
  if (dataModel.currentQuarter.wholeWeeksLeft.durationInWeeks != 0) {
    drawRemainder(dataModel, guidesModel, svg);
  }
  drawDayHand(dataModel, guidesModel, svg);
  drawInfo(dataModel, guidesModel, svg);
  drawLogo(dataModel, guidesModel, svg);
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

  parentGroup
    .append("circle")
    .attr("class", "guide")
    .attr("cx", model.logo.x)
    .attr("cy", model.logo.y)
    .attr("r", 5)
    .style("fill", "red")
    .style("stroke", "red");
}

function drawInfo(dataModel, guidesModel, svg) {
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

function drawLogo(dataModel, guidesModel, svg) {
  const parentGroup = svg.selection.append("g").attr("id", "logo");

  const positionForQuarterIndex = [
    guidesModel.logo.bottom,
    guidesModel.logo.top,
    guidesModel.logo.top,
    guidesModel.logo.bottom,
  ];
  const position = positionForQuarterIndex[dataModel.currentQuarter.index];

  const path = {
    startX: position.x - guidesModel.outerRadius / 2.0,
    startY: position.y + guidesModel.outerRadius / 5.0,
    radiusX: guidesModel.outerRadius,
    radiusY: guidesModel.outerRadius,
    endX: position.x + guidesModel.outerRadius / 2.0,
    endY: position.y + guidesModel.outerRadius / 5.0,
  };
  parentGroup
    .append("defs")
    .append("path")
    .attr(
      "d",
      `M ${path.startX},${path.startY} A ${path.radiusX},${path.radiusY} 0 0,1 ${path.endX},${path.endY}`
    )
    .attr("id", "logoPath");

  const text = parentGroup
    .append("a")
    .attr("href", "https://github.com/mikemoraned/quarterly-clock")
    .append("text");

  text
    .attr(
      "style",
      `font-size: ${guidesModel.logo.fontSize}; dominant-baseline: middle; text-anchor: middle`
    )
    .attr("fill", "black");

  const textPath = text
    .append("textPath")
    .attr("startOffset", "50%")
    .attr("xlink:href", "#logoPath");

  textPath
    .append("tspan")
    .text("\uf017")
    .attr("style", `font-family: "Font Awesome 5 Free"`);
  textPath.append("tspan").text("uarterly");
}

function drawCurrentQuarter(dataModel, guidesModel, svg) {
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

function drawDayHand(dataModel, guidesModel, svg) {
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

function drawWeekScale(dataModel, guidesModel, svg) {
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
