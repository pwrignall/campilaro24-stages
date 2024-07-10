import { scaleLinear } from "https://cdn.jsdelivr.net/npm/d3-scale@3/+esm";
import { max } from "https://cdn.jsdelivr.net/npm/d3-array@3/+esm";
import { line, area } from "https://cdn.jsdelivr.net/npm/d3-shape@3/+esm";
import { dsv } from "https://cdn.jsdelivr.net/npm/d3-fetch@3/+esm";
import { create } from "https://cdn.jsdelivr.net/npm/d3-selection@3/+esm";

const url = "output.psv";
const data = await dsv("|", url, (row) => {
  return {
    stage: row.stage,
    lat: +row.lat,
    lon: +row.lon,
    ele: +row.ele,
    dist: +row.dist,
  };
});

const objects = {};
data.forEach((row) => {
  const { stage, ...rest } = row;
  if (!objects[stage]) {
    objects[stage] = [];
  }
  objects[stage].push(rest);
});

function drawChart(objectsKey) {
  const width = 600;
  const height = 150;

  const x = scaleLinear()
    .domain([0, max(data, (d) => d.dist)])
    // .domain(d3.extent(objects[objectsKey], (d) => d.dist))
    .range([0, width]);

  const y = scaleLinear([0, max(data, (d) => d.ele)], [height, 0]);

  const profileLine = line()
    .x((d) => x(d.dist))
    .y((d) => y(d.ele));

  const profileArea = area()
    .x((d) => x(d.dist))
    .y0(y(0))
    .y1((d) => y(d.ele));

  const svg = create("svg").attr("viewBox", [0, 0, width, height]);

  svg
    .append("path")
    .datum(objects[objectsKey])
    .attr("class", "profile-area")
    .attr("d", profileArea);

  svg
    .append("path")
    .datum(objects[objectsKey])
    .attr("class", "profile-line")
    .attr("d", profileLine);

  const container = document.querySelector(`div[data-stage="${objectsKey}"]`);
  container.append(svg.node());
}

for (const key in objects) {
  drawChart(key);
}
