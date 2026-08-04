/** Máscara pt-BR: "." separa milhar, "," separa decimal. */
export function maskBR(raw: string): string {
  const negative = raw.trimStart().startsWith("-")
  const cleaned = raw.replace(/[^\d,]/g, "")
  const [rawInt = "", ...rest] = cleaned.split(",")
  const hasComma = rest.length > 0
  const decimals = rest.join("")

  const int = rawInt
    .replace(/^0+(?=\d)/, "")
    .replace(/\B(?=(\d{3})+(?!\d))/g, ".")

  const body = hasComma ? `${int},${decimals}` : int
  return negative ? `-${body}` : body
}

export function parseBR(masked: string): number {
  if (!masked) return NaN
  return Number(masked.replace(/\./g, "").replace(",", "."))
}

/** Soma `delta` ao valor mascarado, devolvendo já mascarado. Campo vazio parte de 0. */
export function stepBR(masked: string, delta: number): string {
  const current = parseBR(masked)
  const next = (Number.isNaN(current) ? 0 : current) + delta
  // toFixed(10) evita 0,1 + 1 = 1,1000000000000001
  return maskBR(Number(next.toFixed(10)).toString().replace(".", ","))
}

/** Índice na string mascarada que vem logo após `count` dígitos. */
export function caretAfterDigits(masked: string, count: number): number {
  if (count <= 0) return 0
  let seen = 0
  for (let i = 0; i < masked.length; i++) {
    if (/\d/.test(masked[i])) {
      seen++
      if (seen === count) return i + 1
    }
  }
  return masked.length
}
