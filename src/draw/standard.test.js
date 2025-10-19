import { defaultFontSizeFormat, defaultPositionRounding } from "./standard";


test("defaultFontSizeFormat", () => {
  expect(defaultFontSizeFormat(16)).toBe("16.00px");
  expect(defaultFontSizeFormat(16.666)).toBe("16.67px");
});

test("defaultPositionRounding", () => {
  expect(defaultPositionRounding(12)).toBe(12.0);
  expect(defaultPositionRounding(12.345)).toBe(12.35);
});