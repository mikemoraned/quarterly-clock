import { Guides } from "./guides";
import { useGuides } from "./guides-provider";
import { defaultArcGenerator } from "./standard";
import { For } from "solid-js";
import { scaleQuantize } from "d3-scale";
import { Interval, OrderedIntervals } from "./model/intervals";
import { timeToAngleScale } from "./scales";


export function GutterIntervalNames(props: { intervals: OrderedIntervals }) {
    const guides: Guides = useGuides()!;
    const arcGenerator = defaultArcGenerator();

    const timeScale = timeToAngleScale(props.intervals.limits);

    const segmentScale = scaleQuantize<string>()
        .domain([0, 2 * Math.PI])
        .range(["TopRight", "BottomRight", "BottomLeft", "TopLeft"]);

    const segmentForInterval = (interval: Interval): string => {
        const angleBetween = timeScale(interval.end) - timeScale(interval.start);
        const halfAngle = timeScale(interval.start) + (angleBetween / 2);
        return segmentScale(halfAngle);
    }

    const pathForInterval = (interval: Interval): string => {
        const gutterMargin = (guides.outerRadius - guides.gutterRadius) / 4;
        const radius = guides.gutterRadius + gutterMargin;
        const segment = segmentForInterval(interval);
        if (segment === "TopRight" || segment === "TopLeft") {
            return arcGenerator({
                innerRadius: radius,
                outerRadius: radius,
                startAngle: timeScale(interval.start),
                endAngle: timeScale(interval.end)
            })!;
        }
        else {
            return arcGenerator({
                innerRadius: radius,
                outerRadius: radius,
                startAngle: timeScale(interval.end),
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
                    <path d={pathForInterval(interval)} id={id(i())} />
                    <text>
                        <textPath
                            href={`#${id(i())}`}
                            dominant-baseline={dominantBaselineForInterval(interval)}
                            style="text-anchor: middle;"
                            startOffset="25%"
                        >
                            {interval.name}
                        </textPath>
                    </text>
                </>}
            </For>
        </g>
    )
}
