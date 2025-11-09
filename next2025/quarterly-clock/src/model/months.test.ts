import { describe, expect, test } from "vitest";
import { monthStarts } from "./months";
import { monthIntervals } from "./months";

describe("calendar year is 2021, and quarters start in January", () => {
    test("month starts", () => {
        const starts = monthStarts(2021);
        const expected = [
            new Date(2021, 0, 1),
            new Date(2021, 1, 1),
            new Date(2021, 2, 1),
            new Date(2021, 3, 1),
            new Date(2021, 4, 1),
            new Date(2021, 5, 1),
            new Date(2021, 6, 1),
            new Date(2021, 7, 1),
            new Date(2021, 8, 1),
            new Date(2021, 9, 1),
            new Date(2021, 10, 1),
            new Date(2021, 11, 1)
        ];
        expect(starts).toEqual(expected);
    });
    test("month intervals", () => {
        const intervals = monthIntervals(2021);
        const expectedIntervals = [
            { start: new Date(2021, 0, 1), end: new Date(2021, 1, 1), name: "January" },
            { start: new Date(2021, 1, 1), end: new Date(2021, 2, 1), name: "February" },
            { start: new Date(2021, 2, 1), end: new Date(2021, 3, 1), name: "March" },
            { start: new Date(2021, 3, 1), end: new Date(2021, 4, 1), name: "April" },
            { start: new Date(2021, 4, 1), end: new Date(2021, 5, 1), name: "May" },
            { start: new Date(2021, 5, 1), end: new Date(2021, 6, 1), name: "June" },
            { start: new Date(2021, 6, 1), end: new Date(2021, 7, 1), name: "July" },
            { start: new Date(2021, 7, 1), end: new Date(2021, 8, 1), name: "August" },
            { start: new Date(2021, 8, 1), end: new Date(2021, 9, 1), name: "September" },
            { start: new Date(2021, 9, 1), end: new Date(2021, 10, 1), name: "October" },
            { start: new Date(2021, 10, 1), end: new Date(2021, 11, 1), name: "November" },
            { start: new Date(2021, 11, 1), end: new Date(2022, 0, 1), name: "December" }
        ];
        expect(intervals.intervals).toEqual(expectedIntervals);
        expect(intervals.limits).toEqual({ start: new Date(2021, 0, 1), end: new Date(2022, 0, 1) });
    });
});
