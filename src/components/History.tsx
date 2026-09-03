import type React from "react"
import { formatEntry, type HistoryEntry } from "../lib/history"

const headerBtn =
  "text-xs font-medium transition-colors duration-150 -mx-2 -my-2.5 px-2 py-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-glow rounded"

const rowBtn =
  "shrink-0 w-9 h-9 grid place-items-center rounded-md text-ink-muted transition-colors duration-150 hover:bg-panel-alt focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-glow disabled:opacity-30 disabled:cursor-not-allowed"

const History: React.FC<{
  history: Array<HistoryEntry>
  onClear: () => void
  onSave: () => void
  onDelete: (id: string) => void
  onCopy: (entry: HistoryEntry) => void
  onReuse: (entry: HistoryEntry) => void
  onUpdate: (id: string) => void
  canSave: boolean
  copiedId: string | null
}> = ({ history, onClear, onSave, onDelete, onCopy, onReuse, onUpdate, canSave, copiedId }) => {
  return (
    <div className="flex flex-col gap-2 pt-1">
      <div className="flex items-center justify-between px-1">
        <span className="text-xs font-medium text-ink-muted">
          {history.length} cálculo{history.length !== 1 ? "s" : ""}
        </span>
        <div className="flex gap-3">
          {canSave ? (
            <button
              type="button"
              onClick={onSave}
              className={`${headerBtn} text-brand hover:text-brand-hover`}
            >
              + Salvar atual
            </button>
          ) : null}
          {history.length > 0 && (
            <button
              type="button"
              onClick={onClear}
              className={`${headerBtn} text-danger hover:text-danger-hover`}
            >
              Limpar tudo
            </button>
          )}
        </div>
      </div>

      {history.length === 0 ? (
        <p className="text-center text-sm text-ink-muted py-4">Nenhum cálculo salvo</p>
      ) : (
        <ol className="flex flex-col gap-1 max-h-64 overflow-y-auto">
          {history.map((entry, i) => (
            <li
              key={entry.id}
              className="flex items-center gap-1 py-1 px-2 rounded-md bg-panel text-ink"
            >
              <span className="text-ink-muted mr-1 text-xs shrink-0">{i + 1}.</span>
              <span className="text-sm tabular-nums grow truncate">{formatEntry(entry)}</span>

              <button
                type="button"
                onClick={() => onReuse(entry)}
                className={`${rowBtn} hover:text-brand`}
                aria-label={`Reusar cálculo ${i + 1}`}
                title="Reusar nos campos"
              >
                ↺
              </button>
              <button
                type="button"
                onClick={() => onCopy(entry)}
                className={`${rowBtn} hover:text-brand`}
                aria-label={`Copiar resultado do cálculo ${i + 1}`}
                title={copiedId === entry.id ? "Copiado!" : "Copiar resultado"}
              >
                {copiedId === entry.id ? "✓" : "⧉"}
              </button>
              <button
                type="button"
                onClick={() => onUpdate(entry.id)}
                disabled={!canSave}
                className={`${rowBtn} hover:text-accent`}
                aria-label={`Atualizar cálculo ${i + 1} com os valores atuais`}
                title="Atualizar com os valores atuais"
              >
                ✎
              </button>
              <button
                type="button"
                onClick={() => onDelete(entry.id)}
                className={`${rowBtn} hover:text-danger`}
                aria-label={`Apagar cálculo ${i + 1}`}
                title="Apagar"
              >
                ✕
              </button>
            </li>
          ))}
        </ol>
      )}
    </div>
  )
}

export default History
