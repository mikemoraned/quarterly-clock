import './clock.css';
import { ViewBox } from './svg/view-box';
import { GuidesProvider } from './guides-provider';
import { GuidesVisualisation } from './guides-visualisation';
import { createSignal } from 'solid-js';
import { monthIntervals } from './model/months';
import { Intervals } from './intervals';
import { GutterIntervalNames } from './gutter-names';
import { QuarterSpecification } from './model/quarterSpecification';

export const Clock = (props: { year: number, quarterSpecification: QuarterSpecification }) => {
    const viewBox: ViewBox = {
        width: 1000,
        height: 1000
    };

    const [showGuides, setShowGuides] = createSignal(false);
    const toggleShowGuides = () => {
        setShowGuides(!showGuides());
    }

    const intervals = monthIntervals(props.year, props.quarterSpecification);

    return (<svg
        class="clock"
        viewBox={`-${viewBox.width / 2} -${viewBox.height / 2} ${viewBox.width} ${viewBox.height}`}
        preserveAspectRatio="xMidYMid meet"
        onDblClick={toggleShowGuides}>
        <defs>
            <linearGradient id="month-gradient" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stop-color="gray" />
                <stop offset="100%" stop-color="white" stop-opacity="0" />
            </linearGradient>
        </defs>
        <GuidesProvider viewBox={viewBox}>
            <Intervals intervals={intervals} gradientId="month-gradient" />
            <GutterIntervalNames intervals={intervals} />
            <GuidesVisualisation showGuides={showGuides()} />
        </GuidesProvider>
    </svg>);
};