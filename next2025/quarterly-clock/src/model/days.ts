import { add, eachDayOfInterval } from "date-fns";
import { QuarterSpecification } from "./quarterSpecification";
import { OrderedIntervals } from "./intervals";

export function dayStarts(year: number, quarterSpecification: QuarterSpecification): Date[] {
    const baseDate = new Date(year, quarterSpecification.yearStartMonth, 1);
    const limitDate = add(baseDate, { years: 1 });
    return eachDayOfInterval({ start: baseDate, end: limitDate });
}

export function dayIntervals(year: number, quarterSpecification: QuarterSpecification): OrderedIntervals {
    const intervals = dayStarts(year, quarterSpecification).map((start) => ({
        start,
        end: add(start, { days: 1, seconds: -1 }),
        name: start.toLocaleString('default', { day: 'numeric' })
    }));
    return {
        limits: {
            start: intervals[0].start,
            end: intervals[intervals.length - 1].end
        },
        intervals
    };
}