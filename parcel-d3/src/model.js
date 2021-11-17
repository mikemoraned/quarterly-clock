import {
  add,
  addISOWeekYears,
  differenceInWeeks,
  eachWeekOfInterval,
  endOfISOWeekYear,
  endOfQuarter,
  endOfYear,
  getDayOfYear,
  getDaysInYear,
  getISOWeek,
  getISOWeeksInYear,
  getQuarter,
  getWeek,
  startOfISOWeekYear,
  startOfWeek,
} from "date-fns";
import startOfYear from "date-fns/startOfYear";

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
  const startOfCurrentYear = startOfYear(now);
  const endOfCurrentYear = endOfYear(now);
  // const weeksInYear = eachWeekOfInterval({
  //   start: startOfCurrentYear,
  //   end: endOfCurrentYear,
  // }).map((weekStart) => {
  //   return {
  //     label: `${getISOWeek(weekStart)}`,
  //     start: weekStart,
  //   };
  // });
  const isoStart = startOfISOWeekYear(now);
  const isoWeeks = getISOWeeksInYear(now);
  const range = [...Array(isoWeeks).keys()];
  const weeksInYear = range.map((multiplier) => {
    const label = `${multiplier + 1}`;
    const start = add(isoStart, { weeks: multiplier });
    return {
      label,
      start,
    };
  });
  // const startOfCurrentWeekYear = startOfISOWeekYear(now);
  // const endOfCurrentWeekYear = endOfISOWeekYear(now);
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
    startOfYear: startOfCurrentYear,
    endOfYear: endOfCurrentYear,
    weeks: weeksInYear,
  };
}
