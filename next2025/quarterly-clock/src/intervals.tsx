import { Guides } from "./guides";
import { useGuides } from "./guides-provider";
import { Interval } from "./model/months";
import { defaultArcGenerator } from "./standard";
import { For } from "solid-js";

export function Intervals(props: { intervals: Array<Interval> }) {
    const guides: Guides = useGuides()!;
    const arcGenerator = defaultArcGenerator();

    const pathForInterval = (interval: Interval): string => {
        // Placeholder implementation
        return arcGenerator({
            innerRadius: guides.outerRadius / 3,
            outerRadius: guides.outerRadius - guides.outerRadius / 15,
            startAngle: 0,
            endAngle: Math.PI / 6 // Example angle
        })!;
    }

    return (
        <g class="intervals">
            <For each={props.intervals}>
                {(interval) => <path d={pathForInterval(interval)} fill="red" stroke="black" />}
            </For>
        </g>
    )
}
