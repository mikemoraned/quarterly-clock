import * as d3 from "d3";

export function modelForDate(date) {
  const wholeWeeksSoFar = 16; // TODO: make dynamic
  return {
    wholeWeeksSoFar,
    yearFraction: wholeWeeksSoFar / 52.0,
  };
}
