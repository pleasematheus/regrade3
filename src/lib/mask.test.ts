import assert from "node:assert/strict"

import { caretAfterDigits, maskBR, parseBR, stepBR } from "./mask"

assert.equal(maskBR("1234"), "1.234")
assert.equal(maskBR("1234567"), "1.234.567")
assert.equal(maskBR("1234,5678"), "1.234,5678")
assert.equal(maskBR("-1234"), "-1.234")
assert.equal(maskBR("007"), "7")
assert.equal(maskBR("1.234,5"), "1.234,5")
assert.equal(maskBR("12,34,56"), "12,3456")
assert.equal(maskBR("abc"), "")
assert.equal(maskBR("-"), "-")
assert.equal(maskBR("-5"), "-5")

assert.equal(parseBR("1.234,56"), 1234.56)
assert.equal(parseBR("-1.234"), -1234)
assert.ok(Number.isNaN(parseBR("")))

assert.equal(stepBR("999", 1), "1.000")
assert.equal(stepBR("1.000", -1), "999")
assert.equal(stepBR("", 1), "1")
assert.equal(stepBR("", -1), "-1")
assert.equal(stepBR("0,1", 1), "1,1")
assert.equal(stepBR("-1", -1), "-2")

// caret depois de 4 dígitos em "1.234,5" fica após o "4"
assert.equal(caretAfterDigits("1.234,5", 4), 5)
assert.equal(caretAfterDigits("1.234,5", 0), 0)
assert.equal(caretAfterDigits("1.234,5", 99), 7)

console.log("mask ok")
