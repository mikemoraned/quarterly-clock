import { test, expect, describe } from "vitest"
import { render } from "@solidjs/testing-library"
import { Hand } from "./hand"
import { GuidesProvider } from "./guides-provider";
import { JSX } from "solid-js";
import { ViewBox } from "./svg/view-box";
import { createDateWithinInterval } from "./model/months";
import { Interval } from "./model/intervals";

const YEAR: Interval = {
    start: new Date(2021, 0, 1, 0, 0, 0, 0),
    end: new Date(2021, 11, 31, 23, 59, 59, 999)
};
const VIEW_BOX: ViewBox = {
    width: 1000,
    height: 1000
};

const wrapper = (props: { children: JSX.Element }) => <svg>
    <GuidesProvider viewBox={VIEW_BOX}>
        {props.children}
    </GuidesProvider>
</svg>;

describe("when start of year", async () => {
    const now = createDateWithinInterval(new Date('2021-01-01T00:00:00Z'), YEAR);
    test("default", async () => {
        const { container } = render(() => <Hand now={now} />, { wrapper });
        expect(container).toMatchSnapshot();
    });
    test("debug", async () => {
        const { container } = render(() => <Hand now={now} debug={true} />, { wrapper });
        expect(container).toMatchSnapshot();
    });
});

describe("when mid year", async () => {
    const now = createDateWithinInterval(new Date('2021-06-30T12:00:00Z'), YEAR);
    test("default", async () => {
        const { container } = render(() => <Hand now={now} />, { wrapper });
        expect(container).toMatchSnapshot();
    });
    test("debug", async () => {
        const { container } = render(() => <Hand now={now} debug={true} />, { wrapper });
        expect(container).toMatchSnapshot();
    });
});

describe("when end of year", async () => {
    const now = createDateWithinInterval(new Date('2021-12-31T23:59:59Z'), YEAR);
    test("default", async () => {
        const { container } = render(() => <Hand now={now} />, { wrapper });
        expect(container).toMatchSnapshot();
    });
    test("debug", async () => {
        const { container } = render(() => <Hand now={now} debug={true} />, { wrapper });
        expect(container).toMatchSnapshot();
    });
});
