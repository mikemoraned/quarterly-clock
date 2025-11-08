import './clock.css';
import { ViewBox } from './svg/view-box';
import { GuidesProvider } from './guides-provider';
import { GuidesVisualisation } from './guides-visualisation';
import { createSignal } from 'solid-js';

export const Clock = () => {
    const viewBox: ViewBox = {
        width: 1000,
        height: 1000
    };

    const [showGuides, setShowGuides] = createSignal(true);

    const toggleShowGuides = () => {
        setShowGuides(!showGuides());
    }

    return (<svg
        class="clock"
        viewBox={`-${viewBox.width / 2} -${viewBox.height / 2} ${viewBox.width} ${viewBox.height}`}
        preserveAspectRatio="xMidYMid meet"
        on:click={toggleShowGuides}>
        <GuidesProvider viewBox={viewBox}>
            <GuidesVisualisation showGuides={showGuides()} />
        </GuidesProvider>
    </svg>);
};