import { describe, expect, test } from "vitest";
import { QuarterSpecification } from "./quarterSpecification";
import { dayStarts } from "./days";

describe("calendar year is 2021, and quarters start on January 1st", () => {
    const quarterSpecification = QuarterSpecification.default();
    test("day starts", () => {
        const starts = dayStarts(2021, quarterSpecification);
        expect(starts[0]).toEqual(new Date(2021, 0, 1, 0, 0, 0, 0));
        expect(starts[starts.length - 1]).toEqual(new Date(2021, 11, 31, 0, 0, 0, 0));
        expect(starts.length).toEqual(365);
    });
});

describe("calendar year is 2021, and quarters start on July 1st", () => {
    const quarterSpecification = new QuarterSpecification(6);
    test("day starts", () => {
        const starts = dayStarts(2021, quarterSpecification);
        expect(starts[0]).toEqual(new Date(2021, 6, 1, 0, 0, 0, 0));
        expect(starts[starts.length - 1]).toEqual(new Date(2022, 5, 30, 0, 0, 0, 0));
        expect(starts.length).toEqual(365);
    });
});
