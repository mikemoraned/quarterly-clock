import { modelForDate } from "./model.js";

// references used:
// https://www.epochconverter.com/weeks/2021
// https://www.epochconverter.com/days/2021
// https://whatthequarter.com/

test("start of Q1", () => {
  const now = Date.parse("01 Jan 2021 00:00:00 GMT");
  const model = modelForDate(now);
  expect(model.currentQuarter.label).toBe("Q1");
  // week 1 of 2021 starts on 4th Jan, so startOfNextWeek on Jan 1st
  // is actually start of week 1, which is day 4
  expect(model.startOfNextWeek.yearFraction).toBeCloseTo(4 / 365);
  expect(model.elapsed.yearFraction).toBeCloseTo(0 / 365);
});

test("last day of Q1", () => {
  const now = Date.parse("31 Mar 2021 00:00:00 GMT");
  const model = modelForDate(now);
  expect(model.currentQuarter.label).toBe("Q1");
  expect(model.startOfNextWeek.yearFraction).toBeCloseTo(95 / 365);
  expect(model.elapsed.yearFraction).toBeCloseTo(90 / 365);
});

test("start of Q2", () => {
  const now = Date.parse("01 Apr 2021 00:00:00 GMT");
  const model = modelForDate(now);
  expect(model.currentQuarter.label).toBe("Q2");
  expect(model.startOfNextWeek.yearFraction).toBeCloseTo(95 / 365);
  expect(model.elapsed.yearFraction).toBeCloseTo(91 / 365);
});

test("last day of Q2", () => {
  const now = Date.parse("30 Jun 2021 00:00:00 GMT");
  const model = modelForDate(now);
  expect(model.currentQuarter.label).toBe("Q2");
  expect(model.startOfNextWeek.yearFraction).toBeCloseTo(186 / 365);
  expect(model.elapsed.yearFraction).toBeCloseTo(181 / 365);
});

test("start of Q3", () => {
  const now = Date.parse("01 Jul 2021 00:00:00 GMT");
  const model = modelForDate(now);
  expect(model.currentQuarter.label).toBe("Q3");
  expect(model.startOfNextWeek.yearFraction).toBeCloseTo(186 / 365);
  expect(model.elapsed.yearFraction).toBeCloseTo(182 / 365);
});

test("last day of Q3", () => {
  const now = Date.parse("30 Sep 2021 00:00:00 GMT");
  const model = modelForDate(now);
  expect(model.currentQuarter.label).toBe("Q3");
  expect(model.startOfNextWeek.yearFraction).toBeCloseTo(277 / 365);
  expect(model.elapsed.yearFraction).toBeCloseTo(273 / 365);
});

test("start of Q4", () => {
  const now = Date.parse("01 Oct 2021 00:00:00 GMT");
  const model = modelForDate(now);
  expect(model.currentQuarter.label).toBe("Q4");
  expect(model.startOfNextWeek.yearFraction).toBeCloseTo(277 / 365);
  expect(model.elapsed.yearFraction).toBeCloseTo(274 / 365);
});

test("last day of Q4", () => {
  const now = Date.parse("31 Dec 2021 00:00:00 GMT");
  const model = modelForDate(now);
  expect(model.currentQuarter.label).toBe("Q4");
  // startOfNextWeek is in a week in following year, which is day 3 of next year:
  expect(model.startOfNextWeek.yearFraction).toBeCloseTo(3 / 365);
  expect(model.elapsed.yearFraction).toBeCloseTo(365 / 365);
});
