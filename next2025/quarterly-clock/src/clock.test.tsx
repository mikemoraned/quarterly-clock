import { test, expect } from "vitest"
import { render } from "@solidjs/testing-library"
import { QuarterSpecification } from "./model/quarterSpecification";
import { Clock } from "./clock";

test("when start of year", async () => {
    const now = new Date('2021-01-01T00:00:00Z');
    const { container } = render(() => <Clock now={now} quarterSpecification={QuarterSpecification.default()} />);
    expect(container).toMatchSnapshot();
});

test("when mid year", async () => {
    const now = new Date('2021-06-30T12:00:00Z');
    const { container } = render(() => <Clock now={now} quarterSpecification={QuarterSpecification.default()} />);
    expect(container).toMatchSnapshot();
});

test("when end of year", async () => {
    const now = new Date('2021-12-31T23:59:59Z');
    const { container } = render(() => <Clock now={now} quarterSpecification={QuarterSpecification.default()} />);
    expect(container).toMatchSnapshot();
});
