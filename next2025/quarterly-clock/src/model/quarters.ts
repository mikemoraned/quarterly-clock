import { add } from "date-fns";
import { QuarterSpecification } from "./quarterSpecification";
import { Interval, OrderedIntervals } from "./intervals";

export function quarterStarts(year: number, quarterSpecification: QuarterSpecification): Date[] {
    const baseDate = new Date(year, quarterSpecification.yearStartMonth, 1);
    const quarters = [baseDate];
    for (let i = 1; i < 4; i++) {
        quarters.push(add(baseDate, { months: i * 3 }));
    }
    return quarters;
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
    console.log("quarterSpecification", quarterSpecification);
    const year = date.getFullYear();
    // the current date may be in a quarter from a previous year, so we include that in our search
    const quarters = quarterIntervals(year - 1, quarterSpecification).intervals.concat(quarterIntervals(year, quarterSpecification).intervals);
    console.log("quarters", quarters);
    for (const quarter of quarters) {
        if (date >= quarter.start && date <= quarter.end) {
            return quarter;
        }
    }
    return undefined;
}