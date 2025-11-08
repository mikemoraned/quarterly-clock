import { arc } from "d3-shape";

export function defaultArcGenerator() {
    // @ts-expect-error: digits exists at runtime but is missing from d3-shape typings
    return arc().digits(1);
}