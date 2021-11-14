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
  now = Date.parse("04 Aug 2021 00:00:00 GMT");

  const wholeWeeksSoFar = d3.timeMonday.count(d3.timeYear(now), now);
  const wholeDaysSoFar = d3.timeDay.count(d3.timeYear(now), now);

  const currentQuarterIndex = Math.floor(wholeWeeksSoFar / WEEKS_PER_QUARTER);
  const currentQuarter = QUARTERS[currentQuarterIndex];
  return {
    elapsed: {
      yearFraction: wholeDaysSoFar / 365.0,
    },
    startOfNextWeek: {
      yearFraction: (wholeWeeksSoFar + 1) / 52.0,
    },
    currentQuarter: {
      label: currentQuarter.label,
      end: {
        yearFraction: currentQuarter.end.yearFraction,
        wholeWeeksLeft: currentQuarter.end.wholeWeeks - wholeWeeksSoFar - 1,
      },
    },
  };
}
