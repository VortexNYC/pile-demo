import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const src = readFileSync(new URL("./promo.js", import.meta.url), "utf8");
const applyPromo = new Function(`${src}; return applyPromo;`)();
assert.equal(applyPromo(33.99, "WELCOME10"), 30.591);
console.log("promo tests passed");
