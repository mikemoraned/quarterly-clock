import { describe, expect, test } from "vitest";
import { monthStarts } from "./months";
import { monthIntervals } from "./months";

describe("calendar year is 2021, and quarters start on January 1st", () => {
    test("month starts", () => {
        const starts = monthStarts(2021);
        const expected = [
            new Date(2021, 0, 1, 0, 0, 0, 0),
            new Date(2021, 1, 1, 0, 0, 0, 0),
            new Date(2021, 2, 1, 0, 0, 0, 0),
            new Date(2021, 3, 1, 0, 0, 0, 0),
            new Date(2021, 4, 1, 0, 0, 0, 0),
            new Date(2021, 5, 1, 0, 0, 0, 0),
            new Date(2021, 6, 1, 0, 0, 0, 0),
            new Date(2021, 7, 1, 0, 0, 0, 0),
            new Date(2021, 8, 1, 0, 0, 0, 0),
            new Date(2021, 9, 1, 0, 0, 0, 0),
            new Date(2021, 10, 1, 0, 0, 0, 0),
            new Date(2021, 11, 1, 0, 0, 0, 0)
        ];
        expect(starts).toEqual(expected);
    });
    test("month intervals", () => {
        const intervals = monthIntervals(2021);
        const expectedIntervals = [
            { start: new Date(2021, 0, 1, 0, 0, 0, 0), end: new Date(2021, 0, 31, 23, 59, 59, 999), name: "January" },
            { start: new Date(2021, 1, 1, 0, 0, 0, 0), end: new Date(2021, 1, 28, 23, 59, 59, 999), name: "February" },
            { start: new Date(2021, 2, 1, 0, 0, 0, 0), end: new Date(2021, 2, 31, 23, 59, 59, 999), name: "March" },
            { start: new Date(2021, 3, 1, 0, 0, 0, 0), end: new Date(2021, 3, 30, 23, 59, 59, 999), name: "April" },
            { start: new Date(2021, 4, 1, 0, 0, 0, 0), end: new Date(2021, 4, 31, 23, 59, 59, 999), name: "May" },
            { start: new Date(2021, 5, 1, 0, 0, 0, 0), end: new Date(2021, 5, 30, 23, 59, 59, 999), name: "June" },
            { start: new Date(2021, 6, 1, 0, 0, 0, 0), end: new Date(2021, 6, 31, 23, 59, 59, 999), name: "July" },
            { start: new Date(2021, 7, 1, 0, 0, 0, 0), end: new Date(2021, 7, 31, 23, 59, 59, 999), name: "August" },
            { start: new Date(2021, 8, 1, 0, 0, 0, 0), end: new Date(2021, 8, 30, 23, 59, 59, 999), name: "September" },
            { start: new Date(2021, 9, 1, 0, 0, 0, 0), end: new Date(2021, 9, 31, 23, 59, 59, 999), name: "October" },
            { start: new Date(2021, 10, 1, 0, 0, 0, 0), end: new Date(2021, 10, 30, 23, 59, 59, 999), name: "November" },
            { start: new Date(2021, 11, 1, 0, 0, 0, 0), end: new Date(2021, 11, 31, 23, 59, 59, 999), name: "December" }
        ];
        expect(intervals.intervals).toEqual(expectedIntervals);
        expect(intervals.limits).toEqual({ start: new Date(2021, 0, 1), end: new Date(2021, 11, 31, 23, 59, 59, 999) });
    });
});
