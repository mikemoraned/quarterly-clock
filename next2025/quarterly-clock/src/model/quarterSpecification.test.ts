import { describe, expect, test } from "vitest";
import { parseParameters, QuarterSpecification } from "./quarterSpecification";

describe("parse params", () => {
    test("default when not specified", () => {
        const params = new URLSearchParams();
        const actual = parseParameters(params);

        const expected = QuarterSpecification.default();
        expect(actual).toEqual(expected);
    });

    test("uses human friendly offset", () => {
        const params = new URLSearchParams();
        params.set('yearStartMonth', '7');
        const actual = parseParameters(params);

        const expected = new QuarterSpecification(6);
        expect(actual).toEqual(expected);
    });
});