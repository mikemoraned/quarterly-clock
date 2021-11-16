import * as d3 from "d3";
import {
  add,
  getDayOfYear,
  getDaysInYear,
  getQuarter,
  getWeek,
  startOfWeek,
} from "date-fns";

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
  const elapsedInWholeDays = getDayOfYear(now);
  const daysInYear = getDaysInYear(now);

  const thisDayButNextWeek = add(now, { weeks: 1 });
  const startOfNextWeek = startOfWeek(thisDayButNextWeek);
  const startOfNextWeekInWholeDays = getDayOfYear(startOfNextWeek);

  const wholeWeeksSoFar = d3.timeMonday.count(d3.timeYear(now), now);

  const currentQuarterIndex = getQuarter(now) - 1;
  const currentQuarter = QUARTERS[currentQuarterIndex];
  return {
    elapsed: {
      yearFraction: elapsedInWholeDays / daysInYear,
    },
    startOfNextWeek: {
      yearFraction: startOfNextWeekInWholeDays / daysInYear,
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
