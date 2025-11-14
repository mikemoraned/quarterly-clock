import { BANG_WONG_PALETTE } from "./colors";
import { Interval } from "./model/intervals";
import { scaleQuantize, scaleTime } from "d3-scale";

export function timeToAngleScale(interval: Interval): (date: Date) => number {
    const timeScale = scaleTime()
        .domain([interval.start, interval.end])
        .range([0, 2 * Math.PI]);

    return timeScale;
}

export function timeToQuarterColorScale(interval: Interval): (date: Date) => string {
    const colorScale = scaleQuantize<string>()
        .domain([interval.start, interval.end])
        .range([BANG_WONG_PALETTE["yellow"], BANG_WONG_PALETTE["reddish-purple"], BANG_WONG_PALETTE["sky-blue"], BANG_WONG_PALETTE["bluish-green"]]);

    return colorScale;
}