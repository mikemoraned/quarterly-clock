import { ViewBox } from "./svg/view-box";

export type Guides = {
    outerRadius: number;
    gutterRadius: number;
    innerRadius: number;
};

export function createGuides(viewBox: ViewBox): Guides {
    const maxRadius = Math.min(viewBox.width, viewBox.height) / 2;
    const outerRadius = maxRadius * 0.96;
    const gutterRadius = outerRadius * 0.95;
    const innerRadius = outerRadius / 3;
    return {
        outerRadius,
        gutterRadius,
        innerRadius
    };
}