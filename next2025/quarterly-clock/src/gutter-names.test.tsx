import { test, expect } from "vitest";
import { render } from "@solidjs/testing-library";
import { GuidesProvider } from "./guides-provider";
import { JSX } from "solid-js";
import { ViewBox } from "./svg/view-box";
import { QuarterSpecification } from "./model/quarterSpecification";
import { quarterIntervals } from "./model/quarters";
import { Quarters } from "./quarters";
import { monthIntervals } from "./model/months";
import { Intervals } from "./intervals";
import { GutterIntervalNames } from "./gutter-names";

const VIEW_BOX: ViewBox = {
    width: 1000,
    height: 1000
};

const wrapper = (props: { children: JSX.Element }) => <svg>
    <GuidesProvider viewBox={VIEW_BOX}>
        {props.children}
    </GuidesProvider>
</svg>;

test("calendar year is 2021, and quarters start on January 1st", async () => {
    const quarterSpecification = QuarterSpecification.default();
    const intervals = monthIntervals(2021, quarterSpecification);
    const { container } = render(() => <GutterIntervalNames intervals={intervals} />, { wrapper });
    expect(container).toMatchSnapshot();
});

test("calendar year is 2021, and quarters start on July 1st", () => {
    const quarterSpecification = new QuarterSpecification(6);
    const intervals = monthIntervals(2021, quarterSpecification);
    const { container } = render(() => <GutterIntervalNames intervals={intervals} />, { wrapper });
    expect(container).toMatchSnapshot();
});

