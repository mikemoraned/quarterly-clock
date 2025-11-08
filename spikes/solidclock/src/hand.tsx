import type { Guides } from './guides';
import './hand.css';
import { scaleLinear } from 'd3-scale';

export const Hand = (props: { guides: Guides, elapsedFraction: number }) => {
    const { outerRadius } = props.guides;
    const scale = scaleLinear().domain([0, 1]).range([0, 360]);
    return (
        <g class="hand">
            <circle cx="0" cy="0" r={outerRadius / 20} />
            <line x1="0" y1="0" x2="0" y2={`-${outerRadius}`} transform={`rotate(${scale(props.elapsedFraction)} 0 0)`} />
        </g>
    )
}