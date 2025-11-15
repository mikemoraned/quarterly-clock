import { Guides } from "./guides";
import { useGuides } from "./guides-provider";
import { defaultArcGenerator } from "./standard";
import { For } from "solid-js";
import { Interval, OrderedIntervals } from "./model/intervals";
import { timeToAngleScale } from "./scales";
import './days.css';

function DaySelection(props: { interval: Interval, limits: Interval }) {
    const guides: Guides = useGuides()!;
    const arcGenerator = defaultArcGenerator();

    const timeScale = timeToAngleScale(props.limits);

    const pathForInterval = (interval: Interval): string => {
        return arcGenerator({
            innerRadius: guides.innerRadius,
            outerRadius: guides.gutterRadius,
            startAngle: timeScale(interval.start),
            endAngle: timeScale(interval.end)
        })!;
    }
    return (<path d={pathForInterval(props.interval)} />);
}

export function DaySelector(props: { intervals: OrderedIntervals }) {
    return (
        <g class="day-selector">
            <For each={props.intervals.intervals}>
                {(interval) => <DaySelection interval={interval} limits={props.intervals.limits} />}
            </For>
        </g>
    )
}
