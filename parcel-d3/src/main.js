import { modelForDate } from "./model.js";
import { svg } from "./container";
import { draw } from "./draw";

console.log("Quarterly Clock");
draw(modelForDate(new Date()), svg("container"));
