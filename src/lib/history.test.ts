import { beforeEach, describe, expect, it } from "vitest"
import {
  clearStoredHistory,
  computeResult,
  formatEntry,
  formatResult,
  type HistoryEntry,
  loadHistory,
  saveHistory,
} from "./history"

const V2 = "calculationHistory:v2"
const V1 = "calculationHistory:v1"
const LEGACY = "calculationHistory"

const store = new Map<string, string>()

function installStorage(overrides: Partial<Storage> = {}) {
  Object.defineProperty(globalThis, "localStorage", {
    configurable: true,
    value: {
      getItem: (k: string) => store.get(k) ?? null,
      setItem: (k: string, v: string) => void store.set(k, v),
      removeItem: (k: string) => void store.delete(k),
      ...overrides,
    },
  })
}

const entry = (over: Partial<HistoryEntry> = {}): HistoryEntry => ({
  id: "id-1",
  a: "10",
  b: "20",
  c: "30",
  inverse: false,
  decimalPlaces: 2,
  ...over,
})

beforeEach(() => {
  store.clear()
  installStorage()
})

describe("computeResult", () => {
  it("resolve proporção direta", () => {
    expect(computeResult("10", "20", "30", false)).toBe(60)
  })

  it("resolve proporção inversa", () => {
    expect(computeResult("10", "20", "30", true)).toBeCloseTo(6.666666, 5)
  })

  it("interpreta o separador de milhar pt-BR", () => {
    expect(computeResult("1.000", "2", "4", false)).toBe(0.008)
  })

  it("devolve null quando falta campo", () => {
    expect(computeResult("", "20", "30", false)).toBeNull()
    expect(computeResult("10", "", "30", false)).toBeNull()
  })

  it("devolve null quando o divisor é zero", () => {
    expect(computeResult("0", "20", "30", false)).toBeNull()
    // no modo inverso o divisor é C, não A
    expect(computeResult("10", "20", "0", true)).toBeNull()
    expect(computeResult("0", "20", "30", true)).not.toBeNull()
  })
})

describe("formatResult", () => {
  it("aplica casas decimais e máscara pt-BR", () => {
    expect(formatResult(1234.5, 2)).toBe("1.234,50")
    expect(formatResult(60, 0)).toBe("60")
  })
})

describe("formatEntry", () => {
  it("deriva a linha a partir dos valores brutos", () => {
    expect(formatEntry(entry())).toBe("10 → 20 = 30 → 60,00")
  })

  it("respeita o sentido inverso da entrada", () => {
    expect(formatEntry(entry({ inverse: true }))).toBe("10 → 20 = 30 → 6,67")
  })

  it("cai no texto original quando a entrada é ilegível", () => {
    const migrada = entry({ a: "", b: "", c: "", text: "formato estranho" })
    expect(formatEntry(migrada)).toBe("formato estranho")
  })

  it("devolve string vazia quando não há valores nem texto", () => {
    expect(formatEntry(entry({ a: "", b: "", c: "" }))).toBe("")
  })
})

describe("loadHistory", () => {
  it("devolve lista vazia sem nada armazenado", () => {
    expect(loadHistory()).toEqual([])
  })

  it("lê o formato v2 sem remigrar", () => {
    const atual = [entry({ inverse: true })]
    store.set(V2, JSON.stringify(atual))
    expect(loadHistory()).toEqual(atual)
  })

  it("migra o v1 preservando a exibição original", () => {
    const original = "1.234.567 → 2 = 3 → 0,0000"
    store.set(V1, JSON.stringify([{ id: "x", text: original }]))

    const [migrada] = loadHistory()

    expect(formatEntry(migrada)).toBe(original)
    expect(migrada).toMatchObject({ a: "1.234.567", b: "2", c: "3", decimalPlaces: 4 })
  })

  it("migra o formato legado de strings puras e apaga a chave antiga", () => {
    store.set(LEGACY, JSON.stringify(["5 → 8 = 40 → 64,00"]))

    const [migrada] = loadHistory()

    expect(formatEntry(migrada)).toBe("5 → 8 = 40 → 64,00")
    expect(store.has(LEGACY)).toBe(false)
    expect(store.has(V2)).toBe(true)
  })

  it("assume proporção direta ao migrar, pois o sentido não existia no v1", () => {
    store.set(V1, JSON.stringify([{ id: "x", text: "10 → 20 = 30 → 60,00" }]))
    expect(loadHistory()[0].inverse).toBe(false)
  })

  it("preserva o texto de entradas antigas que não podem ser parseadas", () => {
    store.set(V1, JSON.stringify([{ id: "x", text: "formato estranho" }]))

    const [migrada] = loadHistory()

    expect(migrada.text).toBe("formato estranho")
    expect(migrada.a).toBe("")
  })

  it("descarta as entradas corrompidas e mantém as válidas", () => {
    store.set(V1, JSON.stringify([{ id: "x", text: "10 → 20 = 30 → 60,00" }, null, 42]))

    const migradas = loadHistory()

    expect(migradas).toHaveLength(1)
    expect(formatEntry(migradas[0])).toBe("10 → 20 = 30 → 60,00")
  })

  it("devolve lista vazia quando o JSON está corrompido", () => {
    store.set(V2, "{lixo")
    expect(loadHistory()).toEqual([])
  })

  it("não quebra quando o storage lança", () => {
    installStorage({
      getItem: () => {
        throw new Error("bloqueado")
      },
    })
    expect(loadHistory()).toEqual([])
  })
})

describe("saveHistory e clearStoredHistory", () => {
  it("grava e apaga sob a chave v2", () => {
    saveHistory([entry()])
    expect(JSON.parse(store.get(V2) ?? "null")).toEqual([entry()])

    clearStoredHistory()
    expect(store.has(V2)).toBe(false)
  })

  it("engole erro de cota sem propagar", () => {
    installStorage({
      setItem: () => {
        throw new Error("cota estourada")
      },
    })
    expect(() => saveHistory([entry()])).not.toThrow()
  })
})
