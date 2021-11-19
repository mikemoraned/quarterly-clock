import { modelForDate } from "./model.js";

// references used:
// https://www.epochconverter.com/weeks/2021
// https://www.epochconverter.com/days/2021
// https://whatthequarter.com/

test("start of Q1", () => {
  const now = Date.parse("01 Jan 2021 00:00:00 GMT");
  const model = modelForDate(now);
  expect(model.currentQuarter.label).toBe("Q1");
  expect(model.currentQuarter.end.yearFraction).toBeCloseTo(90 / 365);

  // the last week of the quarter (March 29, 2021	-> April 4, 2021)
  // goes over into next quarter, so we don't count, and
  // we also don't count current week
  expect(model.currentQuarter.wholeWeeksLeft.durationInWeeks).toBe(12);

  // week 1 of 2021 starts on 4th Jan, so startOfNextWeek on Jan 1st
  // is actually start of week 1, which is day 4
  expect(model.currentQuarter.wholeWeeksLeft.start.yearFraction).toBeCloseTo(
    4 / 365
  );
  expect(model.currentQuarter.wholeWeeksLeft.end.yearFraction).toBeCloseTo(
    (4 + 12 * 7) / 365
  );
  expect(model.elapsed.yearFraction).toBeCloseTo(0 / 365);
});

test("last day of Q1", () => {
  const now = Date.parse("31 Mar 2021 00:00:00 GMT");
  const model = modelForDate(now);
  expect(model.currentQuarter.label).toBe("Q1");
  expect(model.currentQuarter.end.yearFraction).toBeCloseTo(90 / 365);
  expect(model.currentQuarter.wholeWeeksLeft.durationInWeeks).toBe(0);

  expect(model.currentQuarter.wholeWeeksLeft.start.yearFraction).toBeCloseTo(
    95 / 365
  );
  expect(model.currentQuarter.wholeWeeksLeft.end.yearFraction).toBeCloseTo(
    (95 + 0 * 7) / 365
  );
  expect(model.elapsed.yearFraction).toBeCloseTo(90 / 365);
});

test("start of Q2", () => {
  const now = Date.parse("01 Apr 2021 00:00:00 GMT");
  const model = modelForDate(now);
  expect(model.currentQuarter.label).toBe("Q2");
  expect(model.currentQuarter.end.yearFraction).toBeCloseTo(182 / 365);
  expect(model.currentQuarter.wholeWeeksLeft.durationInWeeks).toBe(12);

  expect(model.currentQuarter.wholeWeeksLeft.start.yearFraction).toBeCloseTo(
    95 / 365
  );
  expect(model.currentQuarter.wholeWeeksLeft.end.yearFraction).toBeCloseTo(
    (95 + 12 * 7) / 365
  );
  expect(model.elapsed.yearFraction).toBeCloseTo(91 / 365);
});

test("last day of Q2", () => {
  const now = Date.parse("30 Jun 2021 00:00:00 GMT");
  const model = modelForDate(now);
  expect(model.currentQuarter.label).toBe("Q2");
  expect(model.currentQuarter.end.yearFraction).toBeCloseTo(182 / 365);
  expect(model.currentQuarter.wholeWeeksLeft.durationInWeeks).toBe(0);

  expect(model.currentQuarter.wholeWeeksLeft.start.yearFraction).toBeCloseTo(
    186 / 365
  );
  expect(model.currentQuarter.wholeWeeksLeft.end.yearFraction).toBeCloseTo(
    (186 + 0 * 7) / 365
  );
  expect(model.elapsed.yearFraction).toBeCloseTo(181 / 365);
});

test("start of Q3", () => {
  const now = Date.parse("01 Jul 2021 00:00:00 GMT");
  const model = modelForDate(now);
  expect(model.currentQuarter.label).toBe("Q3");
  expect(model.currentQuarter.end.yearFraction).toBeCloseTo(274 / 365);
  expect(model.currentQuarter.wholeWeeksLeft.durationInWeeks).toBe(12);

  expect(model.currentQuarter.wholeWeeksLeft.start.yearFraction).toBeCloseTo(
    186 / 365
  );
  expect(model.currentQuarter.wholeWeeksLeft.end.yearFraction).toBeCloseTo(
    (186 + 12 * 7) / 365
  );
  expect(model.elapsed.yearFraction).toBeCloseTo(182 / 365);
});

test("last day of Q3", () => {
  const now = Date.parse("30 Sep 2021 00:00:00 GMT");
  const model = modelForDate(now);
  expect(model.currentQuarter.label).toBe("Q3");
  expect(model.currentQuarter.end.yearFraction).toBeCloseTo(274 / 365);
  expect(model.currentQuarter.wholeWeeksLeft.durationInWeeks).toBe(0);

  expect(model.currentQuarter.wholeWeeksLeft.start.yearFraction).toBeCloseTo(
    277 / 365
  );
  expect(model.currentQuarter.wholeWeeksLeft.end.yearFraction).toBeCloseTo(
    (277 + 0 * 7) / 365
  );
  expect(model.elapsed.yearFraction).toBeCloseTo(273 / 365);
});

test("start of Q4", () => {
  const now = Date.parse("01 Oct 2021 00:00:00 GMT");
  const model = modelForDate(now);
  expect(model.currentQuarter.label).toBe("Q4");
  expect(model.currentQuarter.end.yearFraction).toBeCloseTo(365 / 365);
  expect(model.currentQuarter.wholeWeeksLeft.durationInWeeks).toBe(12);

  expect(model.currentQuarter.wholeWeeksLeft.start.yearFraction).toBeCloseTo(
    277 / 365
  );
  expect(model.currentQuarter.wholeWeeksLeft.end.yearFraction).toBeCloseTo(
    (277 + 12 * 7) / 365
  );
  expect(model.elapsed.yearFraction).toBeCloseTo(274 / 365);
});

test("last day of Q4", () => {
  const now = Date.parse("31 Dec 2021 00:00:00 GMT");
  const model = modelForDate(now);
  expect(model.currentQuarter.label).toBe("Q4");
  expect(model.currentQuarter.end.yearFraction).toBeCloseTo(365 / 365);
  expect(model.currentQuarter.wholeWeeksLeft.durationInWeeks).toBe(0);

  // startOfNextWeek is in a week in following year, which is day 3 of next year:
  expect(model.currentQuarter.wholeWeeksLeft.start.yearFraction).toBeCloseTo(
    3 / 365
  );
  expect(model.currentQuarter.wholeWeeksLeft.end.yearFraction).toBeCloseTo(
    (3 + 0 * 7) / 365
  );
  expect(model.elapsed.yearFraction).toBeCloseTo(365 / 365);
});
