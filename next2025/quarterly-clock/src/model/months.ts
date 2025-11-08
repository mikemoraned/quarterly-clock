export type Interval = {
    start: Date;
    end: Date;
};

export function monthStarts(year: number): Date[] {
    return Array.from({ length: 12 }, (_, i) => new Date(year, i, 1));
}

export function monthIntervals(year: number): Interval[] {
    const monthBoundaries = monthStarts(year);
    monthBoundaries.push(new Date(year + 1, 0, 1));
    return monthBoundaries.slice(0, 12).map((start, i) => ({
        start,
        end: monthBoundaries[i + 1]
    }));
}