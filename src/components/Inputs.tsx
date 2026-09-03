import clsx from "clsx"
import { AnimatePresence, useReducedMotion } from "framer-motion"
import * as m from "framer-motion/m"
import type React from "react"
import { useEffect, useMemo, useReducer, useRef, useState } from "react"
import {
  clearStoredHistory,
  computeResult,
  formatResult,
  type HistoryEntry,
  loadHistory,
  saveHistory,
} from "../lib/history"
import { caretAfterDigits, maskBR, stepBR } from "../lib/mask"
import History from "./History"
import ProportionArrow from "./ProportionArrow"

type CalculatorState = {
  a: number | string
  b: number | string
  c: number | string
  decimalPlaces: number
  isInverselyProportional: boolean
}

type CalculatorAction =
  | { type: "setField"; field: "a" | "b" | "c"; value: string }
  | { type: "increaseDecimal" }
  | { type: "decreaseDecimal" }
  | { type: "toggleProportional" }
  | { type: "clearInputs" }
  | { type: "loadEntry"; entry: HistoryEntry }

function calculatorReducer(state: CalculatorState, action: CalculatorAction): CalculatorState {
  switch (action.type) {
    case "setField":
      return { ...state, [action.field]: maskBR(action.value) }
    case "increaseDecimal":
      return { ...state, decimalPlaces: Math.min(state.decimalPlaces + 1, 10) }
    case "decreaseDecimal":
      return { ...state, decimalPlaces: Math.max(state.decimalPlaces - 1, 0) }
    case "toggleProportional":
      return {
        ...state,
        isInverselyProportional: !state.isInverselyProportional,
      }
    case "clearInputs":
      return { ...state, a: "", b: "", c: "" }
    case "loadEntry":
      return {
        a: action.entry.a,
        b: action.entry.b,
        c: action.entry.c,
        decimalPlaces: action.entry.decimalPlaces,
        isInverselyProportional: action.entry.inverse,
      }
  }
}

const fieldBase =
  "w-full bg-panel border border-edge rounded-lg px-3 py-2.5 text-center text-lg font-medium text-ink transition-[border-color,box-shadow] duration-200 focus:outline-none focus:border-brand focus:ring-2 focus:ring-glow placeholder:text-ink-muted placeholder:font-normal"

const resultField =
  "w-full bg-brand border border-transparent rounded-lg px-3 py-2.5 text-center text-lg font-bold text-brand-on transition-[box-shadow] duration-200 focus:outline-none focus:ring-2 focus:ring-glow placeholder:text-brand-on/60"

const toolBtn =
  "px-2.5 py-1.5 rounded-md text-sm text-ink-muted hover:text-ink hover:bg-panel-alt transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-glow"

const Inputs: React.FC = () => {
  const [state, dispatch] = useReducer(calculatorReducer, {
    a: "",
    b: "",
    c: "",
    decimalPlaces: 2,
    isInverselyProportional: false,
  })
  const { a, b, c, decimalPlaces, isInverselyProportional } = state

  const [copyLabel, setCopyLabel] = useState("Copiar resultado")
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [showHistory, setShowHistory] = useState(false)
  const [history, setHistory] = useState<Array<HistoryEntry>>(loadHistory)
  const reduced = useReducedMotion()

  // Feedback de "copiado" por item: some sozinho e o cleanup evita escrever
  // estado depois que o painel some.
  useEffect(() => {
    if (copiedId === null) return
    const timer = setTimeout(() => setCopiedId(null), 1500)
    return () => clearTimeout(timer)
  }, [copiedId])

  const inputARef = useRef<HTMLInputElement>(null)
  const inputBRef = useRef<HTMLInputElement>(null)
  const inputCRef = useRef<HTMLInputElement>(null)

  const handleChange = (field: "a" | "b" | "c") => (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target
    const digitsBefore = input.value
      .slice(0, input.selectionStart ?? input.value.length)
      .replace(/\D/g, "").length
    dispatch({ type: "setField", field, value: input.value })
    // ponytail: caret restaurado após o commit do React. Apagar um "." de milhar
    // parece um no-op (a máscara recoloca) — aceito.
    requestAnimationFrame(() => {
      const pos = caretAfterDigits(input.value, digitsBefore)
      input.setSelectionRange(pos, pos)
    })
  }

  const handleKeyDown =
    (field: "a" | "b" | "c", next: React.RefObject<HTMLInputElement | null>) =>
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        e.preventDefault()
        next.current?.focus()
        return
      }
      // ponytail: setas ↑↓ replicam o step do input[type=number]. Passo fixo de 1,
      // sem shift/page-up — se precisar de passo variável, ler decimalPlaces aqui.
      const step = e.key === "ArrowUp" ? 1 : e.key === "ArrowDown" ? -1 : 0
      if (step === 0) return
      e.preventDefault()
      dispatch({
        type: "setField",
        field,
        value: stepBR(e.currentTarget.value, step),
      })
    }

  const d = useMemo(
    () => computeResult(String(a), String(b), String(c), isInverselyProportional) ?? "",
    [a, b, c, isInverselyProportional],
  )

  const panelTransition = reduced
    ? { duration: 0 }
    : { duration: 0.25, ease: [0.16, 1, 0.3, 1] as const }

  const hasResult = typeof d === "number" && !Number.isNaN(d)
  const formatted = hasResult ? formatResult(d, decimalPlaces) : ""

  const currentEntry = (): HistoryEntry => ({
    id: crypto.randomUUID(),
    a: String(a),
    b: String(b),
    c: String(c),
    inverse: isInverselyProportional,
    decimalPlaces,
  })

  const persist = (next: Array<HistoryEntry>) => {
    setHistory(next)
    saveHistory(next)
  }

  const copyToClipboard = () => {
    if (!hasResult) return
    navigator.clipboard
      .writeText(formatted)
      .then(() => {
        setCopyLabel("Copiado!")
        setTimeout(() => setCopyLabel("Copiar resultado"), 1500)
      })
      .catch((err) => console.error("Erro ao copiar:", err))
  }

  const addToHistory = () => {
    if (!hasResult) return
    persist([...history, currentEntry()])
  }

  const clearHistory = () => {
    setHistory([])
    clearStoredHistory()
  }

  const deleteEntry = (id: string) => {
    persist(history.filter((entry) => entry.id !== id))
  }

  /** Sobrescreve a entrada com o cálculo que está na calculadora agora. */
  const updateEntry = (id: string) => {
    if (!hasResult) return
    persist(history.map((entry) => (entry.id === id ? { ...currentEntry(), id } : entry)))
  }

  const reuseEntry = (entry: HistoryEntry) => {
    dispatch({ type: "loadEntry", entry })
    setShowHistory(false)
  }

  const copyEntry = (entry: HistoryEntry) => {
    const result = computeResult(entry.a, entry.b, entry.c, entry.inverse)
    if (result === null) return
    navigator.clipboard
      .writeText(formatResult(result, entry.decimalPlaces))
      .then(() => setCopiedId(entry.id))
      .catch((err) => console.error("Erro ao copiar:", err))
  }

  return (
    <div className="w-full max-w-sm flex flex-col gap-4">
      {/* Calculator grid */}
      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-x-2 gap-y-2 sm:gap-x-3">
        <input
          ref={inputARef}
          type="text"
          inputMode="decimal"
          className={fieldBase}
          onChange={handleChange("a")}
          onKeyDown={handleKeyDown("a", inputBRef)}
          value={a ?? ""}
          placeholder="A"
          aria-label="Campo A"
        />

        <ProportionArrow inverse={isInverselyProportional} />

        <input
          ref={inputBRef}
          type="text"
          inputMode="decimal"
          className={fieldBase}
          onChange={handleChange("b")}
          onKeyDown={handleKeyDown("b", inputCRef)}
          value={b ?? ""}
          placeholder="B"
          aria-label="Campo B"
        />

        <div className="col-span-3 flex justify-center" aria-hidden="true">
          <span className="text-xs font-semibold text-ink-muted tracking-widest select-none">
            =
          </span>
        </div>

        <input
          ref={inputCRef}
          type="text"
          inputMode="decimal"
          className={fieldBase}
          onChange={handleChange("c")}
          onKeyDown={handleKeyDown("c", inputARef)}
          value={c ?? ""}
          placeholder="C"
          aria-label="Campo C"
        />

        <ProportionArrow inverse={isInverselyProportional} />

        <input
          type="text"
          inputMode="numeric"
          className={resultField}
          readOnly
          value={formatted}
          placeholder="X"
          aria-label="Resultado"
        />
      </div>

      {/* Toolbar */}
      <div className="flex items-center justify-center bg-panel rounded-lg p-1 gap-0.5">
        <button
          type="button"
          onClick={() => dispatch({ type: "decreaseDecimal" })}
          className={toolBtn}
          aria-label="Reduzir casas decimais"
        >
          −
        </button>
        <span className="px-1 text-xs font-medium text-ink-muted tabular-nums min-w-[3ch] text-center select-none">
          {decimalPlaces}
        </span>
        <button
          type="button"
          onClick={() => dispatch({ type: "increaseDecimal" })}
          className={toolBtn}
          aria-label="Aumentar casas decimais"
        >
          +
        </button>

        <div className="w-px h-5 bg-edge-subtle mx-1" aria-hidden="true" />

        <button
          type="button"
          onClick={() => dispatch({ type: "toggleProportional" })}
          className={clsx(
            "px-3 py-1.5 rounded-md text-xs font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-glow",
            isInverselyProportional
              ? "bg-brand text-brand-on"
              : "text-ink-muted hover:text-ink hover:bg-panel-alt",
          )}
        >
          ↔ Inverso
        </button>

        <div className="w-px h-5 bg-edge-subtle mx-1" aria-hidden="true" />

        <button
          type="button"
          onClick={() => dispatch({ type: "clearInputs" })}
          className="px-3 py-1.5 rounded-md text-xs font-medium text-ink-muted hover:text-danger hover:bg-panel-alt transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-glow"
        >
          ✕ Limpar
        </button>
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-2">
        <button
          type="button"
          onClick={copyToClipboard}
          disabled={!hasResult}
          className="w-full py-2.5 px-4 rounded-lg bg-brand text-brand-on font-medium text-sm transition-[background-color,transform] duration-200 hover:bg-brand-hover active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-glow disabled:opacity-40 disabled:cursor-not-allowed disabled:active:scale-100"
        >
          {copyLabel}
        </button>

        <button
          type="button"
          onClick={() => setShowHistory((prev) => !prev)}
          className={clsx(
            "w-full py-2 px-4 rounded-lg border font-medium text-sm transition-[background-color,border-color,transform] duration-200 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-glow",
            showHistory
              ? "bg-panel-alt border-edge text-ink"
              : "bg-panel border-edge text-ink-muted hover:text-ink hover:bg-panel-alt",
          )}
        >
          Histórico{history.length > 0 ? ` (${history.length})` : ""}
        </button>
      </div>

      {/* History panel */}
      <m.div layout className="overflow-hidden" transition={panelTransition}>
        <AnimatePresence initial={false}>
          {showHistory ? (
            <m.div
              key="history"
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={panelTransition}
            >
              <History
                history={history}
                onClear={clearHistory}
                onSave={addToHistory}
                onDelete={deleteEntry}
                onCopy={copyEntry}
                onReuse={reuseEntry}
                onUpdate={updateEntry}
                canSave={hasResult}
                copiedId={copiedId}
              />
            </m.div>
          ) : null}
        </AnimatePresence>
      </m.div>
    </div>
  )
}

export default Inputs
