import * as d3 from "d3";

export function drawLogo(dataModel, guidesModel, svg) {
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

export function drawReadme(dataModel, guidesModel, svg) {
  const parentGroup = svg.selection.append("g").attr("id", "readme");

  const positionForQuarterIndex = [
    guidesModel.readme.bottom,
    guidesModel.readme.top,
    guidesModel.readme.top,
    guidesModel.readme.bottom,
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
    .attr("id", "readmePath");

  const text = parentGroup
    .append("a")
    .attr("href", "https://github.com/mikemoraned/quarterly-clock/README.md")
    .append("text");

  text
    .attr(
      "style",
      `font-size: ${guidesModel.readme.fontSize}; dominant-baseline: middle; text-anchor: middle`
    )
    .attr("fill", "black");

  const textPath = text
    .append("textPath")
    .attr("startOffset", "50%")
    .attr("xlink:href", "#readmePath");

  textPath
    .append("tspan")
    .text("\uf4d5")
    .attr("style", `font-family: "Font Awesome 5 Brands"`);
  textPath.append("tspan").text(" Readme");
}
