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
        <>
            <defs>
                <pattern id="remainingPattern" patternUnits="userSpaceOnUse" width="10" height="10" patternTransform="rotate(45)">
                    <rect width="10" height="10" fill="lightgray" />
                    <line x1="0" y1="0" x2="0" y2="10" stroke="white" stroke-width="5" />
                </pattern>
            </defs>
            <g class="remaining">
                <path d={d()} fill="url(#remainingPattern)" stroke="none" />
            </g>
        </>
    );
}