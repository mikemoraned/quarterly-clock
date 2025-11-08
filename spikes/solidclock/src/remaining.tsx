import { arc } from "d3-shape";
import { Guides } from "./guides";

export const Remaining = (props: { guides: Guides, elapsedFraction: number }) => {
    const { outerRadius } = props.guides;

    const arcGenerator = arc();

    const d = (): string | undefined => {
        return arcGenerator({
            innerRadius: outerRadius / 3,
            outerRadius: outerRadius - outerRadius / 15,
            startAngle: props.elapsedFraction * 2.0 * Math.PI,
            endAngle: 2.0 * Math.PI
        }) ?? undefined;
    }

    return (
        <g class="remaining">
            <path d={d()} fill="lightgray" stroke="none" />
        </g>
    );
}