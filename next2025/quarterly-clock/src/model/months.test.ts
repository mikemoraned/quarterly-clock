import { describe, expect, test } from "vitest";
import { Interval, monthStarts } from "./months";
import { monthIntervals } from "./months";

describe("calendar year is 2021, and quarters start on January 1st", () => {
    const quarterStartMonth = 0;
    test("month starts", () => {
        const starts = monthStarts(2021, quarterStartMonth);
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
        const intervals = monthIntervals(2021, quarterStartMonth);
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
        expectEqualIntervals(expectedIntervals, intervals.intervals);
        expect(intervals.limits).toEqual({ start: new Date(2021, 0, 1, 0, 0, 0, 0), end: new Date(2021, 11, 31, 23, 59, 59, 999) });
    });
});

describe("calendar year is 2021, and quarters start on July 1st", () => {
    const quarterStartMonth = 6;
    test("month starts", () => {
        const starts = monthStarts(2021, quarterStartMonth);
        const expected = [
            new Date(2021, 6, 1, 0, 0, 0, 0),
            new Date(2021, 7, 1, 0, 0, 0, 0),
            new Date(2021, 8, 1, 0, 0, 0, 0),
            new Date(2021, 9, 1, 0, 0, 0, 0),
            new Date(2021, 10, 1, 0, 0, 0, 0),
            new Date(2021, 11, 1, 0, 0, 0, 0),
            new Date(2022, 0, 1, 0, 0, 0, 0),
            new Date(2022, 1, 1, 0, 0, 0, 0),
            new Date(2022, 2, 1, 0, 0, 0, 0),
            new Date(2022, 3, 1, 0, 0, 0, 0),
            new Date(2022, 4, 1, 0, 0, 0, 0),
            new Date(2022, 5, 1, 0, 0, 0, 0),
        ];
        expect(starts).toEqual(expected);
    });
    test("month intervals", () => {
        const intervals = monthIntervals(2021, quarterStartMonth);
        const expectedIntervals = [
            { start: new Date(2021, 6, 1, 0, 0, 0, 0), end: new Date(2021, 6, 31, 23, 59, 59, 999), name: "July" },
            { start: new Date(2021, 7, 1, 0, 0, 0, 0), end: new Date(2021, 7, 31, 23, 59, 59, 999), name: "August" },
            { start: new Date(2021, 8, 1, 0, 0, 0, 0), end: new Date(2021, 8, 30, 23, 59, 59, 999), name: "September" },
            { start: new Date(2021, 9, 1, 0, 0, 0, 0), end: new Date(2021, 9, 31, 23, 59, 59, 999), name: "October" },
            { start: new Date(2021, 10, 1, 0, 0, 0, 0), end: new Date(2021, 10, 30, 23, 59, 59, 999), name: "November" },
            { start: new Date(2021, 11, 1, 0, 0, 0, 0), end: new Date(2021, 11, 31, 23, 59, 59, 999), name: "December" },
            { start: new Date(2022, 0, 1, 0, 0, 0, 0), end: new Date(2022, 0, 31, 23, 59, 59, 999), name: "January" },
            { start: new Date(2022, 1, 1, 0, 0, 0, 0), end: new Date(2022, 1, 28, 23, 59, 59, 999), name: "February" },
            { start: new Date(2022, 2, 1, 0, 0, 0, 0), end: new Date(2022, 2, 31, 23, 59, 59, 999), name: "March" },
            { start: new Date(2022, 3, 1, 0, 0, 0, 0), end: new Date(2022, 3, 30, 23, 59, 59, 999), name: "April" },
            { start: new Date(2022, 4, 1, 0, 0, 0, 0), end: new Date(2022, 4, 31, 23, 59, 59, 999), name: "May" },
            { start: new Date(2022, 5, 1, 0, 0, 0, 0), end: new Date(2022, 5, 30, 23, 59, 59, 999), name: "June" },
        ];
        expectEqualIntervals(expectedIntervals, intervals.intervals);
        expect(intervals.limits).toEqual({ start: new Date(2021, 6, 1, 0, 0, 0, 0), end: new Date(2022, 5, 30, 23, 59, 59, 999) });
    });
});

function expectEqualIntervals(expected: Interval[], actual: Interval[]) {
    for (let i = 0; i < Math.min(expected.length, actual.length); i++) {
        expect(actual[i], `interval at index ${i}`).toEqual(expected[i]);
    }
    expect(actual).toEqual(expected);
}