import { test, expect } from "vitest"
import { render } from "@solidjs/testing-library"
import { Hand } from "./hand"
import { Guides } from "./guides";

const defaultGuides: Guides = {
    outerRadius: 100
};

test("when elapsedFraction is 0.0", async () => {
    const { container } = render(() => <Hand elapsedFraction={0.0} guides={defaultGuides} />);
    expect(container).toMatchSnapshot();
});

test("when elapsedFraction is 0.5", async () => {
    const { container } = render(() => <Hand elapsedFraction={0.5} guides={defaultGuides} />);
    expect(container).toMatchSnapshot();
});

test("when elapsedFraction is 1.0", async () => {
    const { container } = render(() => <Hand elapsedFraction={1.0} guides={defaultGuides} />);
    expect(container).toMatchSnapshot();
});