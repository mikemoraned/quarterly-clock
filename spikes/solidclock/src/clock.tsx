import './clock.css';

export const Clock = () => {
    const viewBoxWidth = 1000;
    const viewBoxHeight = 1000;
    return (<svg class="clock" viewBox={`-${viewBoxWidth / 2} -${viewBoxHeight / 2} ${viewBoxWidth} ${viewBoxHeight}`} preserveAspectRatio="xMidYMid meet">
        <circle cx="0" cy="0" r="480" stroke="black" stroke-width="10" fill="white" />
    </svg>);
};