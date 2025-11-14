import { add } from "date-fns";
import { QuarterSpecification } from "./quarterSpecification";
import { OrderedIntervals } from "./intervals";

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
    const intervals = quarterBoundaries.slice(0, 4).map((start, i) => ({
        start,
        end: new Date(quarterBoundaries[i + 1].getTime() - 1),
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