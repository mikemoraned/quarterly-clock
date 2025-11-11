import './clock.css';
import { ViewBox } from './svg/view-box';
import { GuidesProvider } from './guides-provider';
import { GuidesVisualisation } from './guides-visualisation';
import { createSignal } from 'solid-js';
import { createDateWithinInterval, monthIntervals, OrderedIntervals } from './model/months';
import { Intervals } from './intervals';
import { GutterIntervalNames } from './gutter-names';
import { QuarterSpecification } from './model/quarterSpecification';
import { Hand } from './hand';

export const Clock = (props: { now: Date, quarterSpecification: QuarterSpecification }) => {
    const viewBox: ViewBox = {
        width: 1000,
        height: 1000
    };

    const [showGuides, setShowGuides] = createSignal(false);
    const toggleShowGuides = () => {
        setShowGuides(!showGuides());
    }

    const intervals = monthIntervals(props.now.getFullYear(), props.quarterSpecification);
    const nowInContext = createDateWithinInterval(props.now, intervals.limits);

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
            <Hand now={nowInContext} />
            <GuidesVisualisation showGuides={showGuides()} />
        </GuidesProvider>
    </svg>);
};