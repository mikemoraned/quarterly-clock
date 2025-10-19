export function defaultPositionRounding(value) {
    const rounded = value.toFixed(2);
    return parseFloat(rounded);
}

export function defaultFontSizeFormat(value) {
    const rounded = value.toFixed(2);
    return `${rounded}px`;
}