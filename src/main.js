import { modelForDate } from "./model.js";
import { createSvg } from "./container";
import { draw } from "./draw";
import { init } from "./sentry";
import "@fortawesome/fontawesome-free/css/all.css";

console.log("Quarterly Clock");
init({ tracesSampleRate: 1.0 });
const now = new Date();
// const now = Date.parse("01 Jan 2021 00:00:00 GMT");
// const now = Date.parse("31 Mar 2021 00:00:00 GMT");
// const now = Date.parse("01 Apr 2021 00:00:00 GMT");
// const now = Date.parse("30 Jun 2021 00:00:00 GMT");
// const now = Date.parse("01 Jul 2021 00:00:00 GMT");
// const now = Date.parse("30 Sep 2021 00:00:00 GMT");
// const now = Date.parse("01 Oct 2021 00:00:00 GMT");
// const now = Date.parse("31 Dec 2021 00:00:00 GMT");
console.log("Now:", now);
const dataModel = modelForDate(now);
console.dir(dataModel);
createSvg("container").then((svg) => {
  draw(dataModel, svg);
});
