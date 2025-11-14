import { scaleQuantize } from "d3-scale";
import { Guides } from "./guides";
import { useGuides } from "./guides-provider";
import { Interval, midpointOfInterval, OrderedIntervals } from "./model/intervals";
import { defaultArcGenerator } from "./standard";
import { For } from "solid-js";
import { BANG_WONG_PALETTE } from "./colors";
import { timeToAngleScale } from "./scales";

export function Quarters(props: { intervals: OrderedIntervals }) {
    const guides: Guides = useGuides()!;
    const arcGenerator = defaultArcGenerator();

    const timeScale = timeToAngleScale(props.intervals.limits);

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
