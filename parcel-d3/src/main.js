import { modelForDate } from "./model.js";
import { svg } from "./container";
import { draw } from "./draw";

console.log("Quarterly Clock");
const dataModel = modelForDate(new Date());
console.dir(dataModel);
draw(dataModel, svg("container"));
