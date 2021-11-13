import * as d3 from "d3";

const WEEKS_PER_QUARTER = 13;
const QUARTERS = [
  {
    label: "Q1",
    end: {
      wholeWeeks: 1 * WEEKS_PER_QUARTER,
      yearFraction: 0.25,
    },
  },
  {
    label: "Q2",
    end: {
      wholeWeeks: 2 * WEEKS_PER_QUARTER,
      yearFraction: 0.5,
    },
  },
  {
    label: "Q3",
    end: {
      wholeWeeks: 3 * WEEKS_PER_QUARTER,
      yearFraction: 0.75,
    },
  },
  {
    label: "Q4",
    end: {
      wholeWeeks: 4 * WEEKS_PER_QUARTER,
      yearFraction: 1.0,
    },
  },
];

export function modelForDate(now) {
  const wholeWeeksSoFar = d3.timeMonday.count(d3.timeYear(now), now);
  const currentQuarterIndex = Math.floor(wholeWeeksSoFar / WEEKS_PER_QUARTER);
  const currentQuarter = QUARTERS[currentQuarterIndex];
  return {
    elapsed: {
      yearFraction: wholeWeeksSoFar / 52.0,
    },
    currentQuarter: {
      label: currentQuarter.label,
      end: {
        yearFraction: currentQuarter.end.yearFraction,
        wholeWeeksLeft: currentQuarter.end.wholeWeeks - wholeWeeksSoFar,
      },
    },
  };
}
