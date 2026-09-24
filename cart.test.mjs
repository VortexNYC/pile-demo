import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const src = readFileSync(new URL("./cart.js", import.meta.url), "utf8");
const cartTotal = new Function(`${src}; return cartTotal;`)();
assert.equal(cartTotal(["4.99", "29.00"]), 33.99);
console.log("cart tests passed");
