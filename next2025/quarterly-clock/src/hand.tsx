import { Guides } from "./guides";
import { useGuides } from "./guides-provider";
import './hand.css';
import { scaleTime } from "d3-scale";
import { DateWithinInterval } from "./model/intervals";
import { createSignal } from "solid-js";

export function Hand(props: { now: DateWithinInterval, debug?: boolean }) {
    const guides: Guides = useGuides()!;
    const [showDebug, setShowDebug] = createSignal(props.debug ?? false);
    const toggleShowDebug = () => {
        setShowDebug(!showDebug());
    }

    const timeScale = scaleTime()
        .domain([props.now.interval.start, props.now.interval.end])
        .range([0, 360]);

    const rotateAngle = timeScale(props.now.date);

    return (
        <g class="hand" onDblClick={toggleShowDebug}>
            <circle cx={0} cy={0} r={guides.gutterRadius / 20} />
            <line
                stroke-width={guides.gutterRadius / 50}
                x1={0}
                y1={0}
                x2={0}
                y2={-1 * guides.gutterRadius}
                transform={`rotate(${rotateAngle})`}
            />
            {showDebug() && (<line class="debug"
                stroke-width="1px"
                x1={0}
                y1={0}
                x2={0}
                y2={-1 * guides.outerRadius}
                transform={`rotate(${rotateAngle})`}
            />)}
        </g>
    );
}