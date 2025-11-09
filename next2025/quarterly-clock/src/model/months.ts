import { add } from "date-fns";
import { QuarterSpecification } from "./quarterSpecification";

export type Interval = {
    start: Date;
    end: Date;
    name?: string;
};

export type OrderedIntervals = {
    limits: Interval
    intervals: Interval[];
}

export function monthStarts(year: number, quarterSpecification: QuarterSpecification): Date[] {
    const baseDate = new Date(year, quarterSpecification.yearStartMonth, 1);
    const months = [baseDate];
    for (let i = 1; i < 12; i++) {
        months.push(add(baseDate, { months: i }));
    }
    return months;
}

export function monthIntervals(year: number, quarterSpecification: QuarterSpecification): OrderedIntervals {
    const monthBoundaries = monthStarts(year, quarterSpecification);
    monthBoundaries.push(add(monthBoundaries[monthBoundaries.length - 1], { months: 1 }));
    const intervals = monthBoundaries.slice(0, 12).map((start, i) => ({
        start,
        end: new Date(monthBoundaries[i + 1].getTime() - 1),
        name: start.toLocaleString('default', { month: 'long' })
    }));
    return {
        limits: {
            start: intervals[0].start,
            end: intervals[intervals.length - 1].end
        },
        intervals
    };
}