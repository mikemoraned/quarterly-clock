import * as d3 from "d3";

const startOfYear = d3.timeYear();
const startOfDay = d3.timeDay();
const wholeWeeksSoFar = d3.timeWeek.count(startOfYear, startOfDay);
console.log(startOfYear, startOfDay, wholeWeeksSoFar);

function canvas() {
  const container = document.getElementById("container");
  const { width, height } = container.getBoundingClientRect();

  var canvas = document.getElementById("clock");
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;

  const context = canvas.getContext("2d");
  const scale = window.devicePixelRatio;
  canvas.width = Math.floor(width * scale);
  canvas.height = Math.floor(height * scale);
  context.scale(scale, scale);

  return {
    width,
    height,
    context,
  };
}

function draw(wholeWeeksSoFar, canvas) {
  const yearFraction = wholeWeeksSoFar / 52.0;
  console.log(yearFraction);

  const { width, height, context } = canvas;

  const radius = Math.min(width, height) / 2.0;

  const arcGenerator = d3.arc().context(context);

  arcGenerator.innerRadius(radius - 20).outerRadius(radius);
  arcGenerator.padAngle(0.02).padRadius(100).cornerRadius(4);

  const arcData = [
    { startAngle: 0, endAngle: 0.2 },
    { startAngle: 0.2, endAngle: 0.6 },
    { startAngle: 0.6, endAngle: 1.4 },
    { startAngle: 1.4, endAngle: 3 },
    { startAngle: 3, endAngle: 2 * Math.PI },
  ];

  context.fillStyle = "blue";
  context.fillRect(0, 0, width, height);

  context.translate(width / 2.0, height / 2.0);

  context.strokeStyle = "red";
  context.fillStyle = "red";
  context.beginPath();
  arcData.forEach((d) => {
    arcGenerator(d);
  });
  context.fill();
}

draw(wholeWeeksSoFar, canvas());
