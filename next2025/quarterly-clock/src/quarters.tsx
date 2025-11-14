// export function drawAllQuarterContext(dataModel, guidesModel, svg) {
//   const arcGenerator = defaultArcGenerator();

import { scaleQuantile, scaleQuantize, scaleTime } from "d3-scale";
import { Guides } from "./guides";
import { useGuides } from "./guides-provider";
import { Interval, midpointOfInterval, OrderedIntervals } from "./model/intervals";
import { defaultArcGenerator } from "./standard";
import { For } from "solid-js";
import { BANG_WONG_PALETTE } from "./colors";

//   arcGenerator
//     .innerRadius(guidesModel.outerRadius / 6)
//     .outerRadius(guidesModel.outerRadius - 0.7 * guidesModel.outerRadius);

//   const arcs = [
//     {
//       startAngle: 0,
//       endAngle: 0.5 * Math.PI,
//       color: guidesModel.colors.quarters[0].color,
//     },
//     {
//       startAngle: 0.5 * Math.PI,
//       endAngle: Math.PI,
//       color: guidesModel.colors.quarters[1].color,
//     },
//     {
//       startAngle: Math.PI,
//       endAngle: 1.5 * Math.PI,
//       color: guidesModel.colors.quarters[2].color,
//     },
//     {
//       startAngle: 1.5 * Math.PI,
//       endAngle: 2.0 * Math.PI,
//       color: guidesModel.colors.quarters[3].color,
//     },
//   ];

//   const parentGroup = svg.selection.append("g").attr("id", "all-quarters");

//   arcs.forEach((arc) => {
//     parentGroup
//       .append("path")
//       .attr("d", arcGenerator(arc))
//       .attr("fill", arc.color)
//       .attr("stroke", "none");
//   });
// }

export function Quarters(props: { intervals: OrderedIntervals }) {
    const guides: Guides = useGuides()!;
    const arcGenerator = defaultArcGenerator();

    const timeScale = scaleTime()
        .domain([props.intervals.limits.start, props.intervals.limits.end])
        .range([0, 2 * Math.PI]);

    const color = scaleQuantize<string>()
        .domain([props.intervals.limits.start, props.intervals.limits.end])
        .range([BANG_WONG_PALETTE["yellow"], BANG_WONG_PALETTE["reddish-purple"], BANG_WONG_PALETTE["sky-blue"], BANG_WONG_PALETTE["bluish-green"]]);

    const pathForInterval = (interval: Interval): string => {
        return arcGenerator({
            innerRadius: guides.outerRadius / 6,
            outerRadius: guides.outerRadius - 0.7 * guides.outerRadius,
            startAngle: timeScale(interval.start),
            endAngle: timeScale(interval.end)
        })!;
    }

    return (
        <g class="quarters">
            <For each={props.intervals.intervals}>
                {(interval) => <path d={pathForInterval(interval)} stroke="white" fill={color(midpointOfInterval(interval))} />}
            </For>
        </g>
    )
}
