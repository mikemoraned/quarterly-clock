import { BANG_WONG_PALETTE } from "./colors";
import { Interval } from "./model/intervals";
import { scaleQuantize, scaleTime } from "d3-scale";

type Brand<T, B extends string> = T & { __brand: B };
type Radians = Brand<number, "Radians">;
type Degrees = Brand<number, "Degrees">;

export function timeToAngleScale(interval: Interval): (date: Date) => Radians {
    const timeScale = scaleTime()
        .domain([interval.start, interval.end])
        .range([0, 2 * Math.PI]);

    return (date: Date) => timeScale(date) as Radians;
}

export function radiansToDegrees(radians: Radians): Degrees {
    return (radians * (180 / Math.PI)) as Degrees;
}

export function timeToQuarterColorScale(interval: Interval): (date: Date) => string {
    const colorScale = scaleQuantize<string>()
        .domain([interval.start, interval.end])
        .range([BANG_WONG_PALETTE["yellow"], BANG_WONG_PALETTE["reddish-purple"], BANG_WONG_PALETTE["sky-blue"], BANG_WONG_PALETTE["bluish-green"]]);

    return colorScale;
}