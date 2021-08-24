import * as d3 from "d3";

const startOfYear = d3.timeYear();
const startOfDay = d3.timeDay();
const wholeWeeksSoFar = d3.timeWeek.count(startOfYear, startOfDay);
console.log(startOfYear, startOfDay, wholeWeeksSoFar);
