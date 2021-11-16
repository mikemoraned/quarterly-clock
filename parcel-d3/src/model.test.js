import { modelForDate } from "./model.js";

test("start of Q1", () => {
  const now = Date.parse("01 Jan 2021 00:00:00 GMT");
  const model = modelForDate(now);
  expect(model.currentQuarter.label).toBe("Q1");
  expect(model.elapsed.yearFraction).toBeCloseTo(0.0);
});

test("start of Q2", () => {
  const now = Date.parse("01 Apr 2021 00:00:00 GMT");
  const model = modelForDate(now);
  expect(model.currentQuarter.label).toBe("Q2");
  expect(model.elapsed.yearFraction).toBeCloseTo(91 / 365);
});

test("start of Q3", () => {
  const now = Date.parse("01 Jul 2021 00:00:00 GMT");
  const model = modelForDate(now);
  expect(model.currentQuarter.label).toBe("Q3");
  expect(model.elapsed.yearFraction).toBeCloseTo(182 / 365);
});

test("start of Q4", () => {
  const now = Date.parse("01 Oct 2021 00:00:00 GMT");
  const model = modelForDate(now);
  expect(model.currentQuarter.label).toBe("Q4");
  expect(model.elapsed.yearFraction).toBeCloseTo(274 / 365);
});
