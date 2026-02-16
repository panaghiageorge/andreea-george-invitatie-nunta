import { readFileSync, writeFileSync } from "node:fs";
import { Resvg } from "@resvg/resvg-js";

const svg = readFileSync("public/og-image.svg", "utf8");
const resvg = new Resvg(svg, { fitTo: { mode: "width", value: 1200 } });
const pngData = resvg.render().asPng();
writeFileSync("public/og-image.png", pngData);

console.log("Generated public/og-image.png");
