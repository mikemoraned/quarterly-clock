import { Guides } from "./guides";
import { useGuides } from "./guides-provider";
import { defaultArcGenerator } from "./standard";
import { Accessor, createEffect, createSignal, For } from "solid-js";
import { Interval, OrderedIntervals } from "./model/intervals";
import { timeToAngleScale } from "./scales";
import './days.css';
import { BANG_WONG_PALETTE } from "./colors";

function DaySelection(props: { interval: Interval, limits: Interval }) {
    const guides: Guides = useGuides()!;
    const arcGenerator = defaultArcGenerator();
    const [selected, setSelected] = createSignal(false);
    createEffect(() => {
        if (selected()) {
            console.log("Selected day:", props.interval);
        }
    });

    const timeScale = timeToAngleScale(props.limits);

    const pathForInterval = (interval: Interval): string => {
        return arcGenerator({
            innerRadius: guides.innerRadius,
            outerRadius: guides.gutterRadius,
            startAngle: timeScale(interval.start),
            endAngle: timeScale(interval.end)
        })!;
    }
    return (<path d={pathForInterval(props.interval)} onMouseOver={() => setSelected(true)} onMouseOut={() => setSelected(false)} />);
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

function DayRemaining(props: { interval: Interval, limits: Interval }) {
    const guides: Guides = useGuides()!;
    const arcGenerator = defaultArcGenerator();

    const timeScale = timeToAngleScale(props.limits);

    const pathForInterval = (interval: Interval): string => {
        return arcGenerator({
            innerRadius: guides.outerRadius / 3,
            outerRadius: guides.gutterRadius,
            startAngle: timeScale(interval.start),
            endAngle: timeScale(interval.end)
        })!;
    }
    return (<path d={pathForInterval(props.interval)} fill={BANG_WONG_PALETTE["vermillion"]} opacity={0.9} />);
}

export function DaysRemaining(props: { intervals: OrderedIntervals }) {
    return (
        <g class="day-remaining">
            <For each={props.intervals.intervals}>
                {(interval) => <DayRemaining interval={interval} limits={props.intervals.limits} />}
            </For>
        </g>
    )
}

