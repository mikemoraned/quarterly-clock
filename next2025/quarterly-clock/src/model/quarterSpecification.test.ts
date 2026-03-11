import { describe, expect, test } from "vitest";
import { parseParameters, QuarterSpecification } from "./quarterSpecification";

describe("parse params", () => {
    test("default when not specified", () => {
        const params = new URLSearchParams();
        const actual = parseParameters(params);

        const expected = QuarterSpecification.default();
        expect(actual).toEqual(expected);
    });

    test("default when not a number", () => {
        const params = new URLSearchParams();
        params.set('yearStartMonth', 'abc');
        const actual = parseParameters(params);

        const expected = QuarterSpecification.default();
        expect(actual).toEqual(expected);
    });

    test("default when empty", () => {
        const params = new URLSearchParams();
        params.set('yearStartMonth', '');
        const actual = parseParameters(params);

        const expected = QuarterSpecification.default();
        expect(actual).toEqual(expected);
    });

    test("default when too low", () => {
        const params = new URLSearchParams();
        params.set('yearStartMonth', '0');
        const actual = parseParameters(params);

        const expected = QuarterSpecification.default();
        expect(actual).toEqual(expected);
    });

    test("default when too high", () => {
        const params = new URLSearchParams();
        params.set('yearStartMonth', '13');
        const actual = parseParameters(params);

        const expected = QuarterSpecification.default();
        expect(actual).toEqual(expected);
    });

    test("min", () => {
        const params = new URLSearchParams();
        params.set('yearStartMonth', '1');
        const actual = parseParameters(params);

        const expected = new QuarterSpecification(0);
        expect(actual).toEqual(expected);
    });

    test("max", () => {
        const params = new URLSearchParams();
        params.set('yearStartMonth', '12');
        const actual = parseParameters(params);

        const expected = new QuarterSpecification(11);
        expect(actual).toEqual(expected);
    });
});