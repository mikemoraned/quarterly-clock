import { Guides } from "./guides";
import { useGuides } from "./guides-provider";
import { Interval, OrderedIntervals } from "./model/months";
import { defaultArcGenerator } from "./standard";
import { For } from "solid-js";
import { scaleTime } from "d3-scale";

export function Intervals(props: { intervals: OrderedIntervals, gradientId: string }) {
    const guides: Guides = useGuides()!;
    const arcGenerator = defaultArcGenerator();

    const timeScale = scaleTime()
        .domain([props.intervals.limits.start, props.intervals.limits.end])
        .range([0, 2 * Math.PI]);

    const pathForInterval = (interval: Interval): string => {
        return arcGenerator({
            innerRadius: guides.outerRadius / 3,
            outerRadius: guides.outerRadius - guides.outerRadius / 15,
            startAngle: timeScale(interval.start),
            endAngle: timeScale(interval.end)
        })!;
    }

    return (
        <g class="intervals">
            <For each={props.intervals.intervals}>
                {(interval) => <path d={pathForInterval(interval)} fill={`url(#${props.gradientId})`} stroke="white" />}
            </For>
        </g>
    )
}
