import { maskBR, parseBR } from "./mask"

const STORAGE_KEY = "calculationHistory:v2"
const V1_STORAGE_KEY = "calculationHistory:v1"
const LEGACY_STORAGE_KEY = "calculationHistory"

export interface HistoryEntry {
  id: string
  a: string
  b: string
  c: string
  inverse: boolean
  decimalPlaces: number
  /** Texto original de entradas migradas que não puderam ser parseadas. */
  text?: string
}

/** Resultado D da regra de 3, ou null quando os campos não formam um cálculo. */
export function computeResult(a: string, b: string, c: string, inverse: boolean): number | null {
  if (!a || !b || !c) return null
  const numA = parseBR(a)
  const numB = parseBR(b)
  const numC = parseBR(c)
  const divisor = inverse ? numC : numA
  if (divisor === 0) return null
  const result = inverse ? (numA * numB) / numC : (numC * numB) / numA
  return Number.isNaN(result) ? null : result
}

export function formatResult(result: number, decimalPlaces: number): string {
  return maskBR(result.toFixed(decimalPlaces).replace(".", ","))
}

/** Linha exibida no histórico. Cai no texto original quando a entrada é migrada e ilegível. */
export function formatEntry(entry: HistoryEntry): string {
  const result = computeResult(entry.a, entry.b, entry.c, entry.inverse)
  if (result === null) return entry.text ?? ""
  return `${entry.a} → ${entry.b} = ${entry.c} → ${formatResult(result, entry.decimalPlaces)}`
}

function countDecimals(masked: string): number {
  const comma = masked.indexOf(",")
  return comma === -1 ? 0 : masked.length - comma - 1
}

/**
 * Converte `A → B = C → D` no formato v2. O sentido da proporção não está no
 * texto, então entradas migradas voltam como diretas; `text` preserva a
 * exibição original caso o parse falhe.
 */
function parseV1Text(text: string): HistoryEntry {
  const base: HistoryEntry = {
    id: crypto.randomUUID(),
    a: "",
    b: "",
    c: "",
    inverse: false,
    decimalPlaces: 2,
    text,
  }
  const parts = text.split(" → ")
  if (parts.length !== 3) return base
  const middle = parts[1].split(" = ")
  if (middle.length !== 2) return base
  return {
    ...base,
    a: parts[0],
    b: middle[0],
    c: middle[1],
    decimalPlaces: countDecimals(parts[2]),
  }
}

function migrateUnknown(raw: unknown): Array<HistoryEntry> {
  if (!Array.isArray(raw)) return []
  return raw.flatMap((item): Array<HistoryEntry> => {
    try {
      if (typeof item === "string") return [parseV1Text(item)]
      if (item && typeof item === "object" && "text" in item) {
        return [parseV1Text(String((item as { text: unknown }).text))]
      }
    } catch {
      /* entrada corrompida — descartada sem derrubar as demais */
    }
    return []
  })
}

function readKey(key: string): unknown {
  try {
    const data = localStorage.getItem(key)
    return data ? JSON.parse(data) : null
  } catch {
    return null
  }
}

function isV2(raw: unknown): raw is Array<HistoryEntry> {
  return (
    Array.isArray(raw) && raw.every((item) => item && typeof item === "object" && "inverse" in item)
  )
}

export function loadHistory(): Array<HistoryEntry> {
  const current = readKey(STORAGE_KEY)
  if (isV2(current)) return current

  for (const key of [V1_STORAGE_KEY, LEGACY_STORAGE_KEY]) {
    const raw = readKey(key)
    if (raw === null) continue
    const migrated = migrateUnknown(raw)
    saveHistory(migrated)
    try {
      localStorage.removeItem(key)
    } catch {
      /* storage indisponível — migração já está em memória */
    }
    return migrated
  }
  return []
}

export function saveHistory(entries: Array<HistoryEntry>): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries))
  } catch {
    /* cota estourada ou storage bloqueado — estado em memória segue válido */
  }
}

export function clearStoredHistory(): void {
  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch {
    /* nada a fazer */
  }
}
