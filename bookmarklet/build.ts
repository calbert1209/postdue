import { exit } from "https://deno.land/std@0.133.0/node/process.ts";
import { build } from "../deps.ts";

const output = await build({
  entryPoints: ["./bookmarklet/src/index.js"],
  outfile: "./bookmarklet/build/test.js",
  bundle: true,
  minifyWhitespace: true,
  minifySyntax: true,
});

console.log(" build finished", JSON.stringify(output));

exit(0);
