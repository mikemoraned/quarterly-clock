import { arc } from "d3-shape";

export function defaultArcGenerator() {
    return arc().digits(1);
}