import { describe, expect, it } from "vitest"
import { caretAfterMask, maskBR, parseBR, stepBR } from "./mask"

describe("maskBR", () => {
  it("insere separador de milhar", () => {
    expect(maskBR("1234")).toBe("1.234")
    expect(maskBR("1234567")).toBe("1.234.567")
  })

  it("preserva a parte decimal", () => {
    expect(maskBR("1234,5678")).toBe("1.234,5678")
    expect(maskBR("1.234,5")).toBe("1.234,5")
  })

  it("mantém apenas a primeira vírgula", () => {
    expect(maskBR("12,34,56")).toBe("12,3456")
  })

  it("aceita sinal negativo, inclusive isolado", () => {
    expect(maskBR("-1234")).toBe("-1.234")
    expect(maskBR("-")).toBe("-")
    expect(maskBR("-5")).toBe("-5")
  })

  it("descarta zeros à esquerda e caracteres inválidos", () => {
    expect(maskBR("007")).toBe("7")
    expect(maskBR("abc")).toBe("")
  })
})

describe("parseBR", () => {
  it("converte máscara pt-BR em número", () => {
    expect(parseBR("1.234,56")).toBe(1234.56)
    expect(parseBR("-1.234")).toBe(-1234)
  })

  it("devolve NaN para string vazia", () => {
    expect(Number.isNaN(parseBR(""))).toBe(true)
  })
})

describe("stepBR", () => {
  it("incrementa e decrementa remascarando", () => {
    expect(stepBR("999", 1)).toBe("1.000")
    expect(stepBR("1.000", -1)).toBe("999")
  })

  it("trata campo vazio como zero", () => {
    expect(stepBR("", 1)).toBe("1")
    expect(stepBR("", -1)).toBe("-1")
  })

  it("preserva decimais e atravessa o zero", () => {
    expect(stepBR("0,1", 1)).toBe("1,1")
    expect(stepBR("-1", -1)).toBe("-2")
  })
})

describe("caretAfterMask", () => {
  it("permite digitar 10,1 sem mover o cursor para antes da vírgula", () => {
    let value = ""
    let caret = 0
    for (const character of "10,1") {
      const raw = value.slice(0, caret) + character + value.slice(caret)
      caret = caretAfterMask(raw, caret + 1)
      value = maskBR(raw)
      expect(caret).toBe(value.length)
    }
    expect(value).toBe("10,1")
  })

  it("preserva os dois lados da vírgula durante a edição", () => {
    expect(caretAfterMask("10,25", 2)).toBe(2)
    expect(caretAfterMask("10,25", 3)).toBe(3)
    expect(caretAfterMask("10,25", 4)).toBe(4)
    expect(caretAfterMask(",5", 1)).toBe(1)
  })

  it("acompanha a inserção de separadores de milhar", () => {
    expect(caretAfterMask("1234,5", 4)).toBe(5)
    expect(caretAfterMask("1234,5", 5)).toBe(6)
    expect(caretAfterMask("12345,6", 2)).toBe(2)
  })

  it("acompanha o sinal negativo e caracteres removidos pela máscara", () => {
    expect(caretAfterMask("-", 1)).toBe(1)
    expect(caretAfterMask("-10,", 4)).toBe(4)
    expect(caretAfterMask("007,", 4)).toBe(2)
    expect(caretAfterMask("10,,5", 4)).toBe(3)
    expect(caretAfterMask("10x,5", 3)).toBe(2)
  })

  it("trata campo vazio e os extremos", () => {
    expect(caretAfterMask("", 0)).toBe(0)
    expect(caretAfterMask("1.234,5", 0)).toBe(0)
    expect(caretAfterMask("1.234,5", 99)).toBe(7)
  })
})
