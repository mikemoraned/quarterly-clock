import { Guides, Label } from "./guides";
import { useGuides } from "./guides-provider";
import { Interval, midpointOfInterval, OrderedIntervals } from "./model/intervals";
import { defaultArcGenerator } from "./standard";
import { For } from "solid-js";
import { timeToAngleScale, timeToQuarterColorScale } from "./scales";
import { scaleQuantize, scaleTime } from "d3-scale";

export function Quarters(props: { intervals: OrderedIntervals }) {
    const guides: Guides = useGuides()!;
    const arcGenerator = defaultArcGenerator();

    const timeScale = timeToAngleScale(props.intervals.limits);
    const colorScale = timeToQuarterColorScale(props.intervals.limits);

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
                {(interval) => <path d={pathForInterval(interval)} stroke="white" fill={colorScale(midpointOfInterval(interval))} />}
            </For>
        </g>
    )
}

export function CurrentQuarter(props: { currentQuarter: Interval, intervals: OrderedIntervals }) {
    const guides: Guides = useGuides()!;
    const arcGenerator = defaultArcGenerator();

    const timeScale = timeToAngleScale(props.intervals.limits);
    const colorScale = timeToQuarterColorScale(props.intervals.limits);

    const pathForCurrentQuarter =
        arcGenerator({
            innerRadius: guides.outerRadius / 6,
            outerRadius: guides.outerRadius - guides.outerRadius / 4,
            startAngle: timeScale(props.currentQuarter.start),
            endAngle: timeScale(props.currentQuarter.end)
        })!;

    return (
        <g class="current-quarter">
            <path d={pathForCurrentQuarter} stroke="white" fill={colorScale(midpointOfInterval(props.currentQuarter))} />
        </g>
    )
}

export function CurrentQuarterLabel(props: { currentQuarter: Interval, intervals: OrderedIntervals }) {
    const guides: Guides = useGuides()!;

    const timeScale = timeToAngleScale(props.intervals.limits);
    const labelScale = scaleQuantize<Label>()
        .domain([0, 2 * Math.PI])
        .range([guides.quarterLabelLeft, guides.quarterLabelLeft, guides.quarterLabelRight, guides.quarterLabelRight]);
    const colorScale = timeToQuarterColorScale(props.intervals.limits);

    /*
    parentGroup
    .append("text")
    .text(`${dataModel.currentQuarter.label}`)
    .attr("x", position.x)
    .attr("y", position.y)
    .attr(
      "style",
      `font-size: ${guidesModel.quarterLabel.fontSize}; dominant-baseline: text-bottom; text-anchor: left`
    )
    .attr(
      "fill",
      guidesModel.colors.quarters[dataModel.currentQuarter.index].color
    )
    .attr("stroke", "none");
    */

    const label = labelScale(timeScale(midpointOfInterval(props.currentQuarter)));

    return (
        <g class="current-quarter-label">
            <text x={label.position.x} y={label.position.y}
                fill={colorScale(midpointOfInterval(props.currentQuarter))}
                style={`font-size: ${label.fontSize}px; dominant-baseline: text-bottom; text-anchor: left`} >
                {props.currentQuarter.name}</text>
        </g>
    )
}