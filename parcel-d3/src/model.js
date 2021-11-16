import {
  add,
  differenceInWeeks,
  endOfQuarter,
  getDayOfYear,
  getDaysInYear,
  getQuarter,
  startOfWeek,
} from "date-fns";

export function modelForDate(now) {
  const elapsedInWholeDays = getDayOfYear(now);
  const daysInYear = getDaysInYear(now);

  const thisDayButNextWeek = add(now, { weeks: 1 });
  const startOfNextWeek = startOfWeek(thisDayButNextWeek);
  const startOfNextWeekInWholeDays = getDayOfYear(startOfNextWeek);

  const currentQuarter = getQuarter(now);
  const endOfCurrentQuarter = endOfQuarter(now);
  const endOfCurrentQuarterInWholeDays = getDayOfYear(endOfCurrentQuarter);
  const wholeWeeksLeftInCurrentQuarter = Math.abs(
    differenceInWeeks(endOfCurrentQuarter, startOfNextWeek)
  );
  return {
    elapsed: {
      yearFraction: elapsedInWholeDays / daysInYear,
    },
    startOfNextWeek: {
      yearFraction: startOfNextWeekInWholeDays / daysInYear,
    },
    currentQuarter: {
      label: `Q${currentQuarter}`,
      end: {
        yearFraction: endOfCurrentQuarterInWholeDays / daysInYear,
        wholeWeeksLeft: wholeWeeksLeftInCurrentQuarter,
      },
    },
  };
}
