import './clock.css';
import { ViewBox } from './svg/view-box';
import { GuidesProvider } from './guides-provider';
import { GuidesVisualisation } from './guides-visualisation';

export const Clock = () => {
    const viewBox: ViewBox = {
        width: 1000,
        height: 1000
    };


    return (<svg class="clock" viewBox={`-${viewBox.width / 2} -${viewBox.height / 2} ${viewBox.width} ${viewBox.height}`} preserveAspectRatio="xMidYMid meet">
        <GuidesProvider viewBox={viewBox}>
            <GuidesVisualisation />
        </GuidesProvider>
    </svg>);
};