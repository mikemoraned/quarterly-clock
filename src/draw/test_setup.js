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
  return formatted;
}

export const DIMENSIONS = { width: 1000, height: 1000 };
