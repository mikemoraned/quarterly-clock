import { modelForDate } from "./model.js";
import { svg } from "./container";
import { draw } from "./draw";

console.log("Quarterly Clock");
const now = new Date();
// const now = Date.parse("01 Jan 2021 00:00:00 GMT");
// const now = Date.parse("31 Mar 2021 00:00:00 GMT");
// const now = Date.parse("01 Apr 2021 00:00:00 GMT");
// const now = Date.parse("30 Jun 2021 00:00:00 GMT");
// const now = Date.parse("01 Jul 2021 00:00:00 GMT");
// const now = Date.parse("30 Sep 2021 00:00:00 GMT");
// const now = Date.parse("01 Oct 2021 00:00:00 GMT");
// const now = Date.parse("31 Dec 2021 00:00:00 GMT");
const dataModel = modelForDate(now);
console.dir(dataModel);
draw(dataModel, svg("container"));
