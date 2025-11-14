export type DateWithinInterval = {
    date: Date;
    interval: Interval
};

export type Interval = {
    start: Date;
    end: Date;
    name?: string;
};

export type OrderedIntervals = {
    limits: Interval
    intervals: Interval[];
}

export function midpointOfInterval(interval: Interval): Date {
    return new Date((interval.start.getTime() + interval.end.getTime()) / 2);
}