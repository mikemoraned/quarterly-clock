import { test, expect } from "vitest"
import { render } from "@solidjs/testing-library"
import { Remaining } from "./remaining"
import { Guides } from "./guides";
import { DefsProvider } from './defs-provider';
import { DefsSection } from './defs-section';
import { JSX } from "solid-js/jsx-runtime";

const defaultGuides: Guides = {
    outerRadius: 100
};

const wrapper = (props: { children: JSX.Element }) => <svg>
    <DefsProvider>
        <DefsSection />
        {props.children}
    </DefsProvider>
</svg>;

test("when elapsedFraction is 0.0", async () => {
    const { container } = render(() => <Remaining elapsedFraction={0.0} guides={defaultGuides} />, { wrapper });
    expect(container).toMatchSnapshot();
});

test("when elapsedFraction is 0.5", async () => {
    const { container } = render(() => <Remaining elapsedFraction={0.5} guides={defaultGuides} />, { wrapper });
    expect(container).toMatchSnapshot();
});

test("when elapsedFraction is 1.0", async () => {
    const { container } = render(() => <Remaining elapsedFraction={1.0} guides={defaultGuides} />, { wrapper });
    expect(container).toMatchSnapshot();
});