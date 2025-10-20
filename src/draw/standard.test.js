import { defaultFontSizeFormat, defaultPositionRounding, defaultArcGenerator } from "./standard";
import { describe, test, expect } from 'vitest';

test("defaultFontSizeFormat", () => {
  expect(defaultFontSizeFormat(16)).toBe("16.00px");
  expect(defaultFontSizeFormat(16.666)).toBe("16.67px");
});

test("defaultPositionRounding", () => {
  expect(defaultPositionRounding(12)).toBe(12.0);
  expect(defaultPositionRounding(12.345)).toBe(12.35);
});

test("defaultArcGenerator", () => {
  const arcGenerator = defaultArcGenerator();
  expect(arcGenerator.digits()).toBe(3);

  arcGenerator.innerRadius(0).outerRadius(100);
  const path = arcGenerator({
    startAngle: 0,
    endAngle: Math.PI / 2,
  });
  expect(path).toBeDefined();
  expect(path).toBe("M0,-100A100,100,0,0,1,100,0L0,0Z");
});