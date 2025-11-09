import { Guides } from "./guides";
import { useGuides } from "./guides-provider";
import { Interval, OrderedIntervals } from "./model/months";
import { defaultArcGenerator } from "./standard";
import { For } from "solid-js";
import { scaleTime, scaleQuantize } from "d3-scale";


export function GutterIntervalNames(props: { intervals: OrderedIntervals }) {
    const guides: Guides = useGuides()!;
    const arcGenerator = defaultArcGenerator();

    const timeScale = scaleTime()
        .domain([props.intervals.limits.start, props.intervals.limits.end])
        .range([0, 2 * Math.PI]);

    const segmentScale = scaleQuantize<string>()
        .domain([0, 2 * Math.PI])
        .range(["TopRight", "BottomRight", "BottomLeft", "TopLeft"]);

    const segmentForInterval = (interval: Interval): string => {
        const angleBetween = timeScale(interval.end) - timeScale(interval.start);
        const halfAngle = timeScale(interval.start) + (angleBetween / 2);
        return segmentScale(halfAngle);
    }

    const pathForInterval = (interval: Interval): string => {
        const angleBetween = timeScale(interval.end) - timeScale(interval.start);
        const segment = segmentForInterval(interval);
        if (segment === "TopRight" || segment === "TopLeft") {
            const quarterFromStartAngle = timeScale(interval.start) + (angleBetween / 4);

            return arcGenerator({
                innerRadius: guides.gutterRadius,
                outerRadius: guides.gutterRadius,
                startAngle: quarterFromStartAngle,
                endAngle: timeScale(interval.end)
            })!;
        }
        else {
            const quarterFromEndAngle = timeScale(interval.end) - (angleBetween / 4);
            return arcGenerator({
                innerRadius: guides.gutterRadius,
                outerRadius: guides.gutterRadius,
                startAngle: quarterFromEndAngle,
                endAngle: timeScale(interval.start)
            })!;
        }
    };

    const dominantBaselineForInterval = (interval: Interval): "auto" | "hanging" => {
        const segment = segmentForInterval(interval);
        if (segment === "TopRight" || segment === "TopLeft") {
            return "auto";
        }
        else {
            return "hanging";
        }
    };

    const id = (i: number) => `gutter-interval-names-arcs-${i}`;

    return (
        <g class="gutter-interval-names">
            <For each={props.intervals.intervals}>
                {(interval, i) => <>
                    <path d={pathForInterval(interval)} id={id(i())} fill="green" stroke="red" />
                    <text>
                        <textPath href={`#${id(i())}`} dominant-baseline={dominantBaselineForInterval(interval)}>
                            {interval.name}
                        </textPath>
                    </text>
                </>}
            </For>
        </g>
    )
}
