import * as d3 from "d3";

export function defaultPositionRounding(value) {
    const rounded = value.toFixed(2);
    return parseFloat(rounded);
}

export function defaultRotationRounding(value) {
    const rounded = value.toFixed(2);
    return parseFloat(rounded);
}

export function defaultFontSizeFormat(value) {
    const rounded = value.toFixed(2);
    return `${rounded}px`;
}

export function defaultArcGenerator() {
    return d3.arc().digits(3);
}