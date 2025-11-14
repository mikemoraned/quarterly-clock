import { Guides } from "./guides";
import { useGuides } from "./guides-provider";
import { Interval, midpointOfInterval, OrderedIntervals } from "./model/intervals";
import { defaultArcGenerator } from "./standard";
import { For } from "solid-js";
import { timeToAngleScale, timeToQuarterColorScale } from "./scales";

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