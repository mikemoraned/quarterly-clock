import './clock.css';
import { Hand } from './hand';
import type { Guides } from './guides';

export const Clock = () => {
    const viewBoxWidth = 1000;
    const viewBoxHeight = 1000;

    const guidesModel: Guides = {
        outerRadius: 480
    };

    return (<svg class="clock" viewBox={`-${viewBoxWidth / 2} -${viewBoxHeight / 2} ${viewBoxWidth} ${viewBoxHeight}`} preserveAspectRatio="xMidYMid meet">
        <circle cx="0" cy="0" r={guidesModel.outerRadius} stroke="black" stroke-width="10" fill="white" />
        <Hand guides={guidesModel} elapsedFraction={0.5} />
    </svg>);
};