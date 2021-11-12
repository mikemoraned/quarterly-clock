import { modelForDate } from "./model.js";

test("has wholeWeeksSoFar value", () => {
  const date = new Date();
  expect(modelForDate(date)).toHaveProperty("wholeWeeksSoFar");
});
