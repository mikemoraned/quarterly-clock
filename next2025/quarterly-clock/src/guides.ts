import { ViewBox } from "./svg/view-box";

export type Guides = {
    outerRadius: number;
};

export function createGuides(viewBox: ViewBox): Guides {
    const outerRadius = Math.min(viewBox.width, viewBox.height) / 2 * 0.96;
    return {
        outerRadius
    };
}