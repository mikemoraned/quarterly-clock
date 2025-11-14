import { describe, expect, test } from "vitest";
import { monthStarts } from "./months";
import { monthIntervals } from "./months";
import { QuarterSpecification } from "./quarterSpecification";
import { Interval } from "./intervals";
import { quarterIntervals, quarterStarts } from "./quarters";

describe("calendar year is 2021, and quarters start on January 1st", () => {
    const quarterSpecification = QuarterSpecification.default();
    test("quarter starts", () => {
        const starts = quarterStarts(2021, quarterSpecification);
        const expected = [
            new Date(2021, 0, 1, 0, 0, 0, 0),
            new Date(2021, 3, 1, 0, 0, 0, 0),
            new Date(2021, 6, 1, 0, 0, 0, 0),
            new Date(2021, 9, 1, 0, 0, 0, 0),
        ];
        expect(starts).toEqual(expected);
    });
    test("quarter intervals", () => {
        const intervals = quarterIntervals(2021, quarterSpecification);
        const expectedIntervals = [
            { start: new Date(2021, 0, 1, 0, 0, 0, 0), end: new Date(2021, 2, 31, 23, 59, 59, 999), name: "Q1" },
            { start: new Date(2021, 3, 1, 0, 0, 0, 0), end: new Date(2021, 5, 30, 23, 59, 59, 999), name: "Q2" },
            { start: new Date(2021, 6, 1, 0, 0, 0, 0), end: new Date(2021, 8, 30, 23, 59, 59, 999), name: "Q3" },
            { start: new Date(2021, 9, 1, 0, 0, 0, 0), end: new Date(2021, 11, 31, 23, 59, 59, 999), name: "Q4" },
        ];
        expectEqualIntervals(expectedIntervals, intervals.intervals);
        expect(intervals.limits).toEqual({ start: new Date(2021, 0, 1, 0, 0, 0, 0), end: new Date(2021, 11, 31, 23, 59, 59, 999) });
    });
});

describe("calendar year is 2021, and quarters start on July 1st", () => {
    const quarterSpecification = new QuarterSpecification(6);
    test("quarter starts", () => {
        const starts = quarterStarts(2021, quarterSpecification);
        const expected = [
            new Date(2021, 6, 1, 0, 0, 0, 0),
            new Date(2021, 9, 1, 0, 0, 0, 0),
            new Date(2022, 0, 1, 0, 0, 0, 0),
            new Date(2022, 3, 1, 0, 0, 0, 0),
        ];
        expect(starts).toEqual(expected);
    });
    test("quarter intervals", () => {
        const intervals = quarterIntervals(2021, quarterSpecification);
        const expectedIntervals = [
            { start: new Date(2021, 6, 1, 0, 0, 0, 0), end: new Date(2021, 8, 30, 23, 59, 59, 999), name: "Q1" },
            { start: new Date(2021, 9, 1, 0, 0, 0, 0), end: new Date(2021, 11, 31, 23, 59, 59, 999), name: "Q2" },
            { start: new Date(2022, 0, 1, 0, 0, 0, 0), end: new Date(2022, 2, 31, 23, 59, 59, 999), name: "Q3" },
            { start: new Date(2022, 3, 1, 0, 0, 0, 0), end: new Date(2022, 5, 30, 23, 59, 59, 999), name: "Q4" },
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