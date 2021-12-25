import {
  drawCurrentQuarter,
  drawAllQuarterContext,
  drawQuarterLabel,
} from "./quarter";
import { drawWeekScale, drawDayHand } from "./year";
import { drawLogo, drawReadme } from "./about";
import { drawRemainder } from "./remainder";

// color blind safe colors from Bang Wong in and https://www.nature.com/articles/nmeth.1618
// and https://davidmathlogic.com/colorblind
BANG_WONG_PALETTE = {
  black: "rgb(0, 0, 0)",
  orange: "rgb(230, 159, 0)",
  "sky-blue": "rgb(86, 180, 233)",
  "bluish-green": "rgb(0, 158, 115)",
  yellow: "rgb(240, 228, 66)",
  blue: "rgb(0, 114, 178)",
  vermillion: "rgb(213, 94, 0)",
  "reddish-purple": "rgb(204, 121, 167)",
};

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
    colors: {
      quarters: [
        {
          color: BANG_WONG_PALETTE["yellow"],
        },
        {
          color: BANG_WONG_PALETTE["orange"],
        },
        {
          color: BANG_WONG_PALETTE["sky-blue"],
        },
        {
          color: BANG_WONG_PALETTE["bluish-green"],
        },
      ],
    },
    info: {
      fontSize: `${sideLength / 5}px`,
      left: {
        x: -1.0 * clockRadius * 0.62,
        y: 0,
      },
      right: {
        x: clockRadius * 0.62,
        y: 0,
      },
    },
    logo: {
      fontSize: `${sideLength / 13}px`,
      top: {
        x: 0,
        y: -1.0 * clockRadius * 0.6,
      },
      bottom: {
        x: 0,
        y: clockRadius * 0.4,
      },
    },
    readme: {
      fontSize: `${sideLength / 30}px`,
      top: {
        x: 0,
        y: -1.0 * clockRadius * 0.47,
      },
      bottom: {
        x: 0,
        y: clockRadius * 0.52,
      },
    },
    weekScale: {
      fontSize: sideLength / 45,
      yOffset: ((6 / 14) * sideLength) / 45,
    },
  };

  console.log("Guides Model:", JSON.stringify(guidesModel));

  drawWeekScale(dataModel, guidesModel, svg);
  drawAllQuarterContext(dataModel, guidesModel, svg);
  drawCurrentQuarter(dataModel, guidesModel, svg);
  if (dataModel.currentQuarter.wholeWeeksLeft.durationInWeeks != 0) {
    drawRemainder(dataModel, guidesModel, svg);
  }
  drawDayHand(dataModel, guidesModel, svg);
  drawQuarterLabel(dataModel, guidesModel, svg);
  drawLogo(dataModel, guidesModel, svg);
  drawReadme(dataModel, guidesModel, svg);
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
