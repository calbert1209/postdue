import { exit } from "https://deno.land/std@0.133.0/node/process.ts";
import { build, writeFile } from "../deps.ts";

const BUILD_FILEPATH = "./bookmarklet/build/test.js";

const output = await build({
  platform: "browser",
  format: "iife",
  entryPoints: ["./bookmarklet/src/index.js"],
  target: ["es2020"],
  outfile: BUILD_FILEPATH,
  bundle: true,
  minifyWhitespace: true,
  minifySyntax: true,
  // disable automatic write-to-file so output can be manipulated
  write: false,
});

const { errors, warnings, outputFiles } = output;
console.log(" build finished", JSON.stringify({ errors, warnings }));

// I couldn't get ESBuild to use only const. It really wants to insert `var` and `let`
// Manually writing to file via `write: false` enables access to output text for further "linting".
const text = outputFiles?.[0]?.text;
if (text) {
  const linted = text.replace(/(var|let)\s/g, "const ");
  await writeFile(BUILD_FILEPATH, linted);
}

exit(0);
