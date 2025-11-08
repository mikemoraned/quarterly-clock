import { Guides } from "./guides";
import { useGuides } from "./guides-provider";
import { Interval, OrderedIntervals } from "./model/months";
import { defaultArcGenerator } from "./standard";
import { For } from "solid-js";
import { scaleTime } from "d3-scale";

export function GutterIntervalNames(props: { intervals: OrderedIntervals }) {
    const guides: Guides = useGuides()!;
    const arcGenerator = defaultArcGenerator();

    const timeScale = scaleTime()
        .domain([props.intervals.limits.start, props.intervals.limits.end])
        .range([0, 2 * Math.PI]);

    const pathForInterval = (interval: Interval): string => {
        return arcGenerator({
            innerRadius: guides.gutterRadius,
            outerRadius: guides.gutterRadius,
            startAngle: timeScale(interval.start),
            endAngle: timeScale(interval.end)
        })!;
    }

    const id = (i: number) => `gutter-interval-names-arcs-${i}`;

    return (
        <g class="gutter-interval-names">
            <For each={props.intervals.intervals}>
                {(interval, i) => <>
                    <path d={pathForInterval(interval)} id={id(i())} fill="green" stroke="white" />
                    <text>
                        <textPath href={`#${id(i())}`}>
                            {id(i())}
                        </textPath>
                    </text>
                </>}
            </For>
        </g>
    )
}
