export type Interval = {
    start: Date;
    end: Date;
};

export type OrderedIntervals = {
    limits: Interval
    intervals: Interval[];
}

export function monthStarts(year: number): Date[] {
    return Array.from({ length: 12 }, (_, i) => new Date(year, i, 1));
}

export function monthIntervals(year: number): OrderedIntervals {
    const monthBoundaries = monthStarts(year);
    monthBoundaries.push(new Date(year + 1, 0, 1));
    const intervals = monthBoundaries.slice(0, 12).map((start, i) => ({
        start,
        end: monthBoundaries[i + 1]
    }));
    return {
        limits: {
            start: intervals[0].start,
            end: intervals[intervals.length - 1].end
        },
        intervals
    };
}