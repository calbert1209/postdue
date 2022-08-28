import { exit } from "https://deno.land/std@0.133.0/node/process.ts";
import { readFile, transform } from "../deps.ts";

const buffer = await readFile('./bookmarklet/src/index.js');
const output = await transform(buffer.toString(), { format: 'iife' });
const uglyCode = output.code.replace(/(\n|\s{2,})/g, '');
console.log(`javascript: ${uglyCode}`);

exit(0);