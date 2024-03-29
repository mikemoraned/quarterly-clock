import { modelForDate } from "../model.js";
import { createGuidesModel } from "./draw.js";
import {
  drawCurrentQuarter,
  drawAllQuarterContext,
  drawQuarterLabel,
} from "./quarter.js";
import { addSvgRoot } from "./root.js";
import { createParentNode, takeSnapshot, DIMENSIONS } from "./test_setup.js";

describe("drawCurrentQuarter", () => {
  function render(model) {
    const parentNode = createParentNode();
    const svg = addSvgRoot(parentNode, DIMENSIONS);
    const guidesModel = createGuidesModel(svg);

    drawCurrentQuarter(model, guidesModel, svg);

    return parentNode;
  }

  test("start of Q1", () => {
    const now = Date.parse("01 Jan 2021 00:00:00 GMT");
    const model = modelForDate(now);

    const parentNode = render(model);

    expect(takeSnapshot(parentNode)).toMatchSnapshot();
  });

  test("last day of Q1", () => {
    const now = Date.parse("31 Mar 2021 00:00:00 GMT");
    const model = modelForDate(now);

    const parentNode = render(model);

    expect(takeSnapshot(parentNode)).toMatchSnapshot();
  });

  test("start of Q2", () => {
    const now = Date.parse("01 Apr 2021 00:00:00 GMT");
    const model = modelForDate(now);

    const parentNode = render(model);

    expect(takeSnapshot(parentNode)).toMatchSnapshot();
  });

  test("last day of Q2", () => {
    const now = Date.parse("30 Jun 2021 00:00:00 GMT");
    const model = modelForDate(now);

    const parentNode = render(model);

    expect(takeSnapshot(parentNode)).toMatchSnapshot();
  });

  test("start of Q3", () => {
    const now = Date.parse("01 Jul 2021 00:00:00 GMT");
    const model = modelForDate(now);

    const parentNode = render(model);

    expect(takeSnapshot(parentNode)).toMatchSnapshot();
  });

  test("last day of Q3", () => {
    const now = Date.parse("30 Sep 2021 00:00:00 GMT");
    const model = modelForDate(now);

    const parentNode = render(model);

    expect(takeSnapshot(parentNode)).toMatchSnapshot();
  });

  test("start of Q4", () => {
    const now = Date.parse("01 Oct 2021 00:00:00 GMT");
    const model = modelForDate(now);

    const parentNode = render(model);

    expect(takeSnapshot(parentNode)).toMatchSnapshot();
  });

  test("last day of Q4", () => {
    const now = Date.parse("31 Dec 2021 00:00:00 GMT");
    const model = modelForDate(now);

    const parentNode = render(model);

    expect(takeSnapshot(parentNode)).toMatchSnapshot();
  });
});

describe("drawAllQuarterContext", () => {
  function render(model) {
    const parentNode = createParentNode();
    const svg = addSvgRoot(parentNode, DIMENSIONS);
    const guidesModel = createGuidesModel(svg);

    drawAllQuarterContext(model, guidesModel, svg);

    return parentNode;
  }

  test("start of Q1", () => {
    const now = Date.parse("01 Jan 2021 00:00:00 GMT");
    const model = modelForDate(now);

    const parentNode = render(model);

    expect(takeSnapshot(parentNode)).toMatchSnapshot();
  });

  test("last day of Q1", () => {
    const now = Date.parse("31 Mar 2021 00:00:00 GMT");
    const model = modelForDate(now);

    const parentNode = render(model);

    expect(takeSnapshot(parentNode)).toMatchSnapshot();
  });

  test("start of Q2", () => {
    const now = Date.parse("01 Apr 2021 00:00:00 GMT");
    const model = modelForDate(now);

    const parentNode = render(model);

    expect(takeSnapshot(parentNode)).toMatchSnapshot();
  });

  test("last day of Q2", () => {
    const now = Date.parse("30 Jun 2021 00:00:00 GMT");
    const model = modelForDate(now);

    const parentNode = render(model);

    expect(takeSnapshot(parentNode)).toMatchSnapshot();
  });

  test("start of Q3", () => {
    const now = Date.parse("01 Jul 2021 00:00:00 GMT");
    const model = modelForDate(now);

    const parentNode = render(model);

    expect(takeSnapshot(parentNode)).toMatchSnapshot();
  });

  test("last day of Q3", () => {
    const now = Date.parse("30 Sep 2021 00:00:00 GMT");
    const model = modelForDate(now);

    const parentNode = render(model);

    expect(takeSnapshot(parentNode)).toMatchSnapshot();
  });

  test("start of Q4", () => {
    const now = Date.parse("01 Oct 2021 00:00:00 GMT");
    const model = modelForDate(now);

    const parentNode = render(model);

    expect(takeSnapshot(parentNode)).toMatchSnapshot();
  });

  test("last day of Q4", () => {
    const now = Date.parse("31 Dec 2021 00:00:00 GMT");
    const model = modelForDate(now);

    const parentNode = render(model);

    expect(takeSnapshot(parentNode)).toMatchSnapshot();
  });
});

describe("drawQuarterLabel", () => {
  function render(model) {
    const parentNode = createParentNode();
    const svg = addSvgRoot(parentNode, DIMENSIONS);
    const guidesModel = createGuidesModel(svg);

    drawQuarterLabel(model, guidesModel, svg);

    return parentNode;
  }

  test("start of Q1", () => {
    const now = Date.parse("01 Jan 2021 00:00:00 GMT");
    const model = modelForDate(now);

    const parentNode = render(model);

    expect(takeSnapshot(parentNode)).toMatchSnapshot();
  });

  test("last day of Q1", () => {
    const now = Date.parse("31 Mar 2021 00:00:00 GMT");
    const model = modelForDate(now);

    const parentNode = render(model);

    expect(takeSnapshot(parentNode)).toMatchSnapshot();
  });

  test("start of Q2", () => {
    const now = Date.parse("01 Apr 2021 00:00:00 GMT");
    const model = modelForDate(now);

    const parentNode = render(model);

    expect(takeSnapshot(parentNode)).toMatchSnapshot();
  });

  test("last day of Q2", () => {
    const now = Date.parse("30 Jun 2021 00:00:00 GMT");
    const model = modelForDate(now);

    const parentNode = render(model);

    expect(takeSnapshot(parentNode)).toMatchSnapshot();
  });

  test("start of Q3", () => {
    const now = Date.parse("01 Jul 2021 00:00:00 GMT");
    const model = modelForDate(now);

    const parentNode = render(model);

    expect(takeSnapshot(parentNode)).toMatchSnapshot();
  });

  test("last day of Q3", () => {
    const now = Date.parse("30 Sep 2021 00:00:00 GMT");
    const model = modelForDate(now);

    const parentNode = render(model);

    expect(takeSnapshot(parentNode)).toMatchSnapshot();
  });

  test("start of Q4", () => {
    const now = Date.parse("01 Oct 2021 00:00:00 GMT");
    const model = modelForDate(now);

    const parentNode = render(model);

    expect(takeSnapshot(parentNode)).toMatchSnapshot();
  });

  test("last day of Q4", () => {
    const now = Date.parse("31 Dec 2021 00:00:00 GMT");
    const model = modelForDate(now);

    const parentNode = render(model);

    expect(takeSnapshot(parentNode)).toMatchSnapshot();
  });
});
