import './clock.css';
import { ViewBox } from './svg/view-box';
import { GuidesProvider } from './guides-provider';
import { GuidesVisualisation } from './guides-visualisation';
import { createSignal } from 'solid-js';
import { createDateWithinInterval, monthIntervals } from './model/months';
import { Intervals } from './intervals';
import { GutterIntervalNames } from './gutter-names';
import { QuarterSpecification } from './model/quarterSpecification';
import { Hand } from './hand';
import { CurrentQuarter, CurrentQuarterLabel, Quarters } from './quarters';
import { quarterIntervalForDate, quarterIntervals } from './model/quarters';
import { dayIntervals } from './model/days';
import { DaySelector, DaysRemaining } from './days';
import { intervalsWhollyAfterDate, intervalsWithinInterval, OrderedIntervals } from './model/intervals';
import { excludeWithWeekendOverlaps } from './model/exclusions';

export const Clock = (props: { now: Date, quarterSpecification: QuarterSpecification }) => {
    const viewBox: ViewBox = {
        width: 1000,
        height: 1000
    };

    const [showGuides, setShowGuides] = createSignal(false);
    const toggleShowGuides = () => {
        setShowGuides(!showGuides());
    }

    const monthsInYear = monthIntervals(props.now.getFullYear(), props.quarterSpecification);
    const nowInYear = createDateWithinInterval(props.now, monthsInYear.limits);
    const quartersInYear = quarterIntervals(props.now.getFullYear(), props.quarterSpecification);
    const currentQuarter = quarterIntervalForDate(props.now, props.quarterSpecification)!;

    console.log("currentQuarter", currentQuarter);

    const daysInYear = dayIntervals(props.now.getFullYear(), props.quarterSpecification);
    const daysInCurrentQuarter = intervalsWithinInterval(daysInYear, currentQuarter);

    console.log("daysInCurrentQuarter", daysInCurrentQuarter);

    const daysRemainingInCurrentQuarter: OrderedIntervals = {
        intervals: excludeWithWeekendOverlaps(intervalsWhollyAfterDate(daysInCurrentQuarter.intervals, props.now)),
        limits: daysInYear.limits
    };

    console.log("daysRemainingInCurrentQuarter", daysRemainingInCurrentQuarter);

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
            <Intervals intervals={monthsInYear} gradientId="month-gradient" />
            <GutterIntervalNames intervals={monthsInYear} />
            <Quarters intervals={quartersInYear} />
            <CurrentQuarter currentQuarter={currentQuarter} intervals={quartersInYear} />
            <DaysRemaining intervals={daysRemainingInCurrentQuarter} />
            <DaySelector intervals={daysInYear} />
            <CurrentQuarterLabel currentQuarter={currentQuarter} intervals={quartersInYear} />
            <Hand now={nowInYear} />
            <GuidesVisualisation showGuides={showGuides()} />
        </GuidesProvider>
    </svg>);
};