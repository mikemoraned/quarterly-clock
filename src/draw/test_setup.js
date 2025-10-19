import { JSDOM } from "jsdom";
import xmlFormat from "xml-formatter";

export function createParentNode() {
  const jsdom = new JSDOM();
  const document = jsdom.window.document;
  const parentNode = document.createElement("div");
  return parentNode;
}

export function takeSnapshot(node) {
  const content = node.innerHTML;
  const formatted = xmlFormat(content);

  // Our XML contains a lot of floating point numbers which can differ by
  // small amounts in different environments. We truncate any stream of 10
  // or more numbers after a period to the first 10 as a quick and dirty 
  // way of normalizing this.
  const normalized = formatted.replace(/(\.[0-9]{10})[0-9]*/g, '$1');

  return normalized;
}

export const DIMENSIONS = { width: 1000, height: 1000 };
