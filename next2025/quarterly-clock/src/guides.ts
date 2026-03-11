import { ViewBox } from "./svg/view-box";

export type Position = {
    x: number;
    y: number;
};

export type Label = {
    fontSize: number;
    position: Position;
};

export type Guides = {
    outerRadius: number;
    gutterRadius: number;
    innerRadius: number;
    quarterLabelLeft: Label;
    quarterLabelRight: Label;
};

export function createGuides(viewBox: ViewBox): Guides {
    const minRadius = Math.min(viewBox.width, viewBox.height) / 2;
    const outerRadius = minRadius * 0.96;
    const gutterRadius = outerRadius * 0.95;
    const innerRadius = outerRadius / 3;
    const quarterLabelFontSize = outerRadius / 2.5;

    return {
        outerRadius,
        gutterRadius,
        innerRadius,
        quarterLabelLeft: {
            fontSize: quarterLabelFontSize,
            position: {
                x: -1.0 * outerRadius * 0.9,
                y: 0,
            }
        },
        quarterLabelRight: {
            fontSize: quarterLabelFontSize,
            position: {
                x: outerRadius * 0.35,
                y: 0,
            }
        },
    };
}