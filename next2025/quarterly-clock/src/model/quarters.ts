import { add } from "date-fns";
import { QuarterSpecification } from "./quarterSpecification";
import { Interval, OrderedIntervals } from "./intervals";

export function quarterStarts(year: number, quarterSpecification: QuarterSpecification): Date[] {
    const baseDate = new Date(year, quarterSpecification.yearStartMonth, 1);
    const months = [baseDate];
    for (let i = 1; i < 4; i++) {
        months.push(add(baseDate, { months: i * 3 }));
    }
    return months;
}

export function quarterIntervals(year: number, quarterSpecification: QuarterSpecification): OrderedIntervals {
    const quarterBoundaries = quarterStarts(year, quarterSpecification);
    quarterBoundaries.push(add(quarterBoundaries[quarterBoundaries.length - 1], { months: 3 }));
    const quarterNames = ["Q1", "Q2", "Q3", "Q4"];
    const intervals = quarterBoundaries.slice(0, 4).map((start, i) => ({
        start,
        end: new Date(quarterBoundaries[i + 1].getTime() - 1),
        name: quarterNames[i]
    }));
    return {
        limits: {
            start: intervals[0].start,
            end: intervals[intervals.length - 1].end
        },
        intervals
    };
}

export function quarterIntervalForDate(date: Date, quarterSpecification: QuarterSpecification): Interval | undefined {
    const year = date.getFullYear();
    const quarters = quarterIntervals(year, quarterSpecification).intervals;
    for (const quarter of quarters) {
        if (date >= quarter.start && date <= quarter.end) {
            return quarter;
        }
    }
    return undefined;
}