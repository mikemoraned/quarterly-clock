import { modelForDate } from "../model.js";
import { addSvgRoot } from "./root.js";
import { draw } from "./draw.js";
import { JSDOM } from "jsdom";
import xmlFormat from "xml-formatter";

function createParentNode() {
  const jsdom = new JSDOM();
  const document = jsdom.window.document;
  const parentNode = document.createElement("div");
  return parentNode;
}

function takeSnapshot(node) {
  const content = node.innerHTML;
  const formatted = xmlFormat(content);

  return formatted;
}

const DIMENSIONS = { width: 1000, height: 1000 };

function render(model) {
  const parentNode = createParentNode();
  const svg = addSvgRoot(parentNode, DIMENSIONS);

  draw(model, svg);

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
