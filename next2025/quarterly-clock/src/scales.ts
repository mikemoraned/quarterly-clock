import { Interval } from "./model/intervals";
import { scaleTime } from "d3-scale";

export function timeToAngleScale(interval: Interval): (date: Date) => number {
    const timeScale = scaleTime()
        .domain([interval.start, interval.end])
        .range([0, 2 * Math.PI]);

    return timeScale;
}