import type { Guides } from './guides';

export const Hand = (props: { guides: Guides }) => {
    return (
        <g class="hand">
            <line x1="0" y1="0" x2="0" y2={`-${props.guides.outerRadius}`} stroke="black" stroke-width="8" />
        </g>
    )
}