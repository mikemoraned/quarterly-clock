import { Guides } from "./guides";
import { useGuides } from "./guides-provider";
import { defaultArcGenerator } from "./standard";
import { For } from "solid-js";
import { Interval, OrderedIntervals } from "./model/intervals";
import { timeToAngleScale } from "./scales";

export function DaySelector(props: { intervals: OrderedIntervals }) {
    const guides: Guides = useGuides()!;
    const arcGenerator = defaultArcGenerator();

    const timeScale = timeToAngleScale(props.intervals.limits);

    const pathForInterval = (interval: Interval): string => {
        return arcGenerator({
            innerRadius: guides.innerRadius,
            outerRadius: guides.gutterRadius,
            startAngle: timeScale(interval.start),
            endAngle: timeScale(interval.end)
        })!;
    }

    return (
        <g class="day-selector">
            <For each={props.intervals.intervals}>
                {(interval) => <path d={pathForInterval(interval)} stroke="white" />}
            </For>
        </g>
    )
}
