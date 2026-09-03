import { describe, expect, it } from "vitest"
import { caretAfterDigits, maskBR, parseBR, stepBR } from "./mask"

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

describe("caretAfterDigits", () => {
  it("posiciona o caret após a contagem de dígitos, pulando separadores", () => {
    // 4 dígitos em "1.234,5" terminam depois do "4"
    expect(caretAfterDigits("1.234,5", 4)).toBe(5)
  })

  it("trata os extremos", () => {
    expect(caretAfterDigits("1.234,5", 0)).toBe(0)
    expect(caretAfterDigits("1.234,5", 99)).toBe(7)
  })
})
