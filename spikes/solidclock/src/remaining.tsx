import { arc } from "d3-shape";
import { Guides } from "./guides";
import { useDefs } from "./defs-provider";
import { createEffect, onCleanup } from "solid-js";

export const Remaining = (props: { guides: Guides, elapsedFraction: number }) => {
    const defs = useDefs();
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

    const rotateAngle = (): number => (props.elapsedFraction * 360.0) - 90.0;

    const pattern = () => (
        <pattern id="remainingPattern" patternUnits="userSpaceOnUse" width="10" height="10" patternTransform={`rotate(${rotateAngle()})`}>
            <rect width="10" height="10" fill="lightgray" />
            <line x1="0" y1="0" x2="0" y2="10" stroke="white" stroke-width="5" />
        </pattern>
    );

    createEffect(() => {
        defs?.update("remaining", pattern());
        onCleanup(() => {
            defs?.update("remaining", undefined);
        });
    });

    return (
        <g class="remaining">
            <path d={d()} fill="url(#remainingPattern)" stroke="none" />
        </g>
    );
}