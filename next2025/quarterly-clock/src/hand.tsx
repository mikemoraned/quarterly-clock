import { Guides } from "./guides";
import { useGuides } from "./guides-provider";
import './hand.css';
import { scaleTime } from "d3-scale";
import { DateWithinInterval } from "./model/intervals";

export function Hand(props: { now: DateWithinInterval }) {
    const guides: Guides = useGuides()!;

    const timeScale = scaleTime()
        .domain([props.now.interval.start, props.now.interval.end])
        .range([0, 360]);

    return (
        <g class="hand">
            <circle cx={0} cy={0} r={guides.gutterRadius / 20} />
            <line
                stroke-width={guides.gutterRadius / 50}
                x1={0}
                y1={0}
                x2={0}
                y2={-1 * guides.gutterRadius}
                transform={`rotate(${timeScale(props.now.date)})`}
            />
        </g>
    );
}