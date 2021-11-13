import * as d3 from "d3";

export function modelForDate(date) {
  const wholeWeeksSoFar = 16; // TODO: make dynamic
  return {
    elapsed: {
      yearFraction: wholeWeeksSoFar / 52.0,
    },
    currentQuarter: {
      label: "Q2",
      end: {
        yearFraction: 0.5,
        wholeWeeksLeft: 5,
      },
    },
  };
}
