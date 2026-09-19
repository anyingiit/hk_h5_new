import assert from "assert";
import {isNumber} from "../src/utils/data/isNumber";
import {toNumber} from "../src/utils/data/toNumber";

assert.strictEqual(isNumber("42"), true, 'isNumber("42") should be true');
assert.strictEqual(isNumber("abc"), false, 'isNumber("abc") should be false');
assert.strictEqual(toNumber("42"), 42, 'toNumber("42") should equal 42');
assert.ok(Number.isNaN(toNumber("abc")), 'toNumber("abc") should be NaN');

console.log("smoke test passed");
