import {
  drawCurrentQuarter,
  drawAllQuarterContext,
  drawQuarterLabel,
} from "./quarter";
import { drawWeekScale, drawDayHand } from "./year";
import { drawLogo, drawReadme } from "./about";
import { drawRemainder, drawRemainderLabel } from "./remainder";
import { defaultFontSizeFormat, defaultPositionRounding as dpr } from "./standard";

// color blind safe colors from Bang Wong in and https://www.nature.com/articles/nmeth.1618
// and https://davidmathlogic.com/colorblind
const BANG_WONG_PALETTE = {
  black: "rgb(0, 0, 0)",
  orange: "rgb(230, 159, 0)",
  "sky-blue": "rgb(86, 180, 233)",
  "bluish-green": "rgb(0, 158, 115)",
  yellow: "rgb(240, 228, 66)",
  blue: "rgb(0, 114, 178)",
  vermillion: "rgb(213, 94, 0)",
  "reddish-purple": "rgb(204, 121, 167)",
};

export function createGuidesModel(svg) {
  const outerMargin = 100;

  const sideLength = Math.min(
    svg.width - outerMargin,
    svg.height - outerMargin
  );
  const clockRadius = sideLength / 2.0;

  const guidesModel = {
    outerRadius: clockRadius,
    remainder: {
      fontSize: defaultFontSizeFormat(sideLength / 15),
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
          color: BANG_WONG_PALETTE["reddish-purple"],
        },
        {
          color: BANG_WONG_PALETTE["sky-blue"],
        },
        {
          color: BANG_WONG_PALETTE["bluish-green"],
        },
      ],
      remainder: {
        bg: {
          color: BANG_WONG_PALETTE["vermillion"],
        },
        weekNumber: {
          color: "black",
        },
      },
    },
    quarterLabel: {
      fontSize: defaultFontSizeFormat(sideLength / 5),
      left: {
        x: -1.0 * clockRadius * 0.9,
        y: 0,
      },
      right: {
        x: clockRadius * 0.35,
        y: 0,
      },
    },
    remainderLabel: {
      fontSize: defaultFontSizeFormat(sideLength / 22),
      left: {
        x: -1.0 * clockRadius * 0.87,
        y: clockRadius * 0.03,
      },
      right: {
        x: clockRadius * 0.38,
        y: clockRadius * 0.03,
      },
    },
    logo: {
      fontSize: defaultFontSizeFormat(sideLength / 13),
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
      fontSize: defaultFontSizeFormat(sideLength / 30),
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

  return guidesModel;
}

export function draw(dataModel, svg) {
  const guidesModel = createGuidesModel(svg);

  console.log("Guides Model:", JSON.stringify(guidesModel));

  drawWeekScale(dataModel, guidesModel, svg);
  drawAllQuarterContext(dataModel, guidesModel, svg);
  drawCurrentQuarter(dataModel, guidesModel, svg);
  if (dataModel.currentQuarter.wholeWeeksLeft.durationInWeeks != 0) {
    drawRemainder(dataModel, guidesModel, svg);
  }
  drawRemainderLabel(dataModel, guidesModel, svg);
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
    .attr("r", dpr(model.outerRadius))
    .style("fill", "none")
    .style("stroke", "red");

  parentGroup
    .append("circle")
    .attr("class", "guide")
    .attr("cx", dpr(model.quarterLabel.left.x))
    .attr("cy", dpr(model.quarterLabel.left.y))
    .attr("r", 5)
    .style("fill", "red")
    .style("stroke", "black");

  parentGroup
    .append("circle")
    .attr("class", "guide")
    .attr("cx", dpr(model.quarterLabel.right.x))
    .attr("cy", dpr(model.quarterLabel.right.y))
    .attr("r", 5)
    .style("fill", "red")
    .style("stroke", "black");

  parentGroup
    .append("circle")
    .attr("class", "guide")
    .attr("cx", dpr(model.remainderLabel.left.x))
    .attr("cy", dpr(model.remainderLabel.left.y))
    .attr("r", 5)
    .style("fill", "red")
    .style("stroke", "black");

  parentGroup
    .append("circle")
    .attr("class", "guide")
    .attr("cx", dpr(model.remainderLabel.right.x))
    .attr("cy", dpr(model.remainderLabel.right.y))
    .attr("r", 5)
    .style("fill", "red")
    .style("stroke", "black");

  parentGroup
    .append("circle")
    .attr("class", "guide")
    .attr("cx", dpr(model.logo.top.x))
    .attr("cy", dpr(model.logo.top.y))
    .attr("r", 5)
    .style("fill", "red")
    .style("stroke", "black");

  parentGroup
    .append("circle")
    .attr("class", "guide")
    .attr("cx", dpr(model.logo.bottom.x))
    .attr("cy", dpr(model.logo.bottom.y))
    .attr("r", 5)
    .style("fill", "red")
    .style("stroke", "black");
}
