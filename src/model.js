import {
  add,
  differenceInWeeks,
  endOfQuarter,
  endOfYear,
  getDayOfYear,
  getDaysInYear,
  getISOWeeksInYear,
  getQuarter,
  startOfISOWeekYear,
  startOfQuarter,
  startOfWeek,
  eachDayOfInterval,
  eachWeekendOfInterval
} from "date-fns";
import startOfYear from "date-fns/startOfYear";

export function modelForDate(now) {
  const elapsedInWholeDays = getDayOfYear(now);
  const daysInYear = getDaysInYear(now);

  const thisDayButNextWeek = add(now, { weeks: 1 });
  const startOfNextWeek = startOfWeek(thisDayButNextWeek);
  const startOfNextWeekInWholeDays = getDayOfYear(startOfNextWeek);

  const currentQuarter = getQuarter(now);
  const startOfCurrentQuarter = startOfQuarter(now);
  const startOfCurrentQuarterInWholeDays = getDayOfYear(startOfCurrentQuarter);
  const endOfCurrentQuarter = endOfQuarter(now);
  const endOfCurrentQuarterInWholeDays = getDayOfYear(endOfCurrentQuarter);
  const wholeWeeksLeftInCurrentQuarter = Math.abs(
    differenceInWeeks(endOfCurrentQuarter, startOfNextWeek)
  );
  const startOfCurrentYear = startOfYear(now);
  const endOfCurrentYear = endOfYear(now);
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

  // find all weekends in the current quarter that are still ahead
  const remainingInterval = {
    start: startOfNextWeek,
    end: add(startOfNextWeek, { weeks: wholeWeeksLeftInCurrentQuarter }),
  };
  const weekends = eachWeekendOfInterval(remainingInterval);
  const allDays = eachDayOfInterval(remainingInterval);
  const nonWeekendDays = allDays.filter((d) => {
    return !weekends.find((w) => w.getTime() === d.getTime());
  });
  return {
    elapsed: {
      yearFraction: elapsedInWholeDays / daysInYear,
    },
    currentQuarter: {
      index: currentQuarter - 1,
      label: `Q${currentQuarter}`,
      start: {
        yearFraction: startOfCurrentQuarterInWholeDays / daysInYear,
      },
      end: {
        yearFraction: endOfCurrentQuarterInWholeDays / daysInYear,
      },
      wholeWeeksLeft: {
        start: {
          yearFraction: startOfNextWeekInWholeDays / daysInYear,
        },
        end: {
          yearFraction:
            (startOfNextWeekInWholeDays + wholeWeeksLeftInCurrentQuarter * 7) /
            daysInYear,
        },
        durationInWeeks: wholeWeeksLeftInCurrentQuarter,
      },
      availableDays: nonWeekendDays.map((date) => ({
        start: { yearFraction: getDayOfYear(date) / daysInYear },
        end: { yearFraction: getDayOfYear(add(date, { days: 1 })) / daysInYear },
      })),
    },
    startOfYear: startOfCurrentYear,
    endOfYear: endOfCurrentYear,
    weeks: weeksInYear,
  };
}
