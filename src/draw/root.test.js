import { modelForDate } from "../model.js";
import { createGuidesModel } from "./draw.js";
import { drawLogo, drawReadme } from "./about.js";
import { addSvgRoot } from "./root.js";
import { createParentNode, takeSnapshot } from "./test_setup.js";
import { describe, test, expect } from 'vitest';

const SMALL = 50;
const LARGE = 10000;

describe("addSvgRoot", () => {
  function render(dimensions) {
    const parentNode = createParentNode();
    const svg = addSvgRoot(parentNode, dimensions);

    return parentNode;
  }

  test("small square", () => {
    const parentNode = render({ width: SMALL, height: SMALL });

    expect(takeSnapshot(parentNode)).toMatchSnapshot();
  });

  test("large square", () => {
    const parentNode = render({ width: LARGE, height: LARGE });

    expect(takeSnapshot(parentNode)).toMatchSnapshot();
  });

  test("landscape", () => {
    const parentNode = render({ width: LARGE, height: SMALL });

    expect(takeSnapshot(parentNode)).toMatchSnapshot();
  });

  test("portrait", () => {
    const parentNode = render({ width: SMALL, height: LARGE });

    expect(takeSnapshot(parentNode)).toMatchSnapshot();
  });
});
