import { test, expect, describe } from "vitest";
import { render } from "@solidjs/testing-library";
import { GuidesProvider } from "./guides-provider";
import { JSX } from "solid-js";
import { ViewBox } from "./svg/view-box";
import { QuarterSpecification } from "./model/quarterSpecification";
import { quarterIntervalForDate, quarterIntervals } from "./model/quarters";
import { CurrentQuarter, Quarters } from "./quarters";

const VIEW_BOX: ViewBox = {
    width: 1000,
    height: 1000
};

const wrapper = (props: { children: JSX.Element }) => <svg>
    <GuidesProvider viewBox={VIEW_BOX}>
        {props.children}
    </GuidesProvider>
</svg>;

const NOW = new Date('2021-01-01T00:00:00Z');
const YEAR = 2021;

describe("calendar year is 2021, and quarters start on January 1st", async () => {
    const quarterSpecification = QuarterSpecification.default();
    const intervals = quarterIntervals(YEAR, quarterSpecification);
    test("Quarters", () => {
        const { container } = render(() => <Quarters intervals={intervals} />, { wrapper });
        expect(container).toMatchSnapshot();
    });
    test("CurrentQuarter", () => {
        const currentQuarter = quarterIntervalForDate(NOW, quarterSpecification)!;
        const { container } = render(() => <CurrentQuarter currentQuarter={currentQuarter} intervals={intervals} />, { wrapper });
        expect(container).toMatchSnapshot();
    });
});

describe("calendar year is 2021, and quarters start on July 1st", () => {
    const quarterSpecification = QuarterSpecification.default();
    const intervals = quarterIntervals(2021, quarterSpecification);
    test("Quarters", () => {
        const { container } = render(() => <Quarters intervals={intervals} />, { wrapper });
        expect(container).toMatchSnapshot();
    });
    test("CurrentQuarter", () => {
        const currentQuarter = quarterIntervalForDate(NOW, quarterSpecification)!;
        const { container } = render(() => <CurrentQuarter currentQuarter={currentQuarter} intervals={intervals} />, { wrapper });
        expect(container).toMatchSnapshot();
    });
});

