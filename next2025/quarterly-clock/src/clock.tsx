import './clock.css';
import { ViewBox } from './svg/view-box';
import { GuidesProvider } from './guides-provider';
import { GuidesVisualisation } from './guides-visualisation';
import { createSignal } from 'solid-js';
import { monthIntervals } from './model/months';
import { Intervals } from './intervals';

export const Clock = () => {
    const viewBox: ViewBox = {
        width: 1000,
        height: 1000
    };

    const [showGuides, setShowGuides] = createSignal(false);
    const toggleShowGuides = () => {
        setShowGuides(!showGuides());
    }

    const intervals = monthIntervals(new Date().getFullYear());

    return (<svg
        class="clock"
        viewBox={`-${viewBox.width / 2} -${viewBox.height / 2} ${viewBox.width} ${viewBox.height}`}
        preserveAspectRatio="xMidYMid meet"
        onDblClick={toggleShowGuides}>
        <GuidesProvider viewBox={viewBox}>
            <GuidesVisualisation showGuides={showGuides()} />
            <Intervals intervals={intervals} />
        </GuidesProvider>
    </svg>);
};