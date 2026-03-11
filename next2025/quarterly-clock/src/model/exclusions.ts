import { Interval } from "./intervals";

export function excludeWithWeekendOverlaps(intervals: Interval[]): Interval[] {
    return intervals.filter(interval => {
        const startDay = interval.start.getDay();
        const endDay = interval.end.getDay();

        // If the interval starts on a Saturday (6) or Sunday (0), exclude it
        if (startDay === 6 || startDay === 0) {
            return false;
        }

        // If the interval ends on a Saturday (6) or Sunday (0), exclude it
        if (endDay === 6 || endDay === 0) {
            return false;
        }

        return true;
    });
}