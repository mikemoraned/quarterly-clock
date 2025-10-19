import { defaultFontSizeFormat } from "./standard";


test("fontSize", () => {
  expect(defaultFontSizeFormat(16)).toBe("16.00px");
  expect(defaultFontSizeFormat(16.666)).toBe("16.67px");
});