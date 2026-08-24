import type React from "react"

interface HistoryEntry {
  id: string
  text: string
}

const History: React.FC<{
  history: Array<HistoryEntry>
  onClear: () => void
  onSave: () => void
  canSave: boolean
}> = ({ history, onClear, onSave, canSave }) => {
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
              className="text-xs font-medium text-brand hover:text-brand-hover transition-colors duration-150"
            >
              + Salvar atual
            </button>
          ) : null}
          {history.length > 0 && (
            <button
              type="button"
              onClick={onClear}
              className="text-xs font-medium text-danger hover:text-danger-hover transition-colors duration-150"
            >
              Limpar tudo
            </button>
          )}
        </div>
      </div>

      {history.length === 0 ? (
        <p className="text-center text-sm text-ink-muted py-4">Nenhum cálculo salvo</p>
      ) : (
        <ol className="flex flex-col gap-1 max-h-48 overflow-y-auto">
          {history.map((entry, i) => (
            <li
              key={entry.id}
              className="text-sm py-2 px-3 rounded-md bg-panel text-ink tabular-nums"
            >
              <span className="text-ink-muted mr-2 text-xs">{i + 1}.</span>
              {entry.text}
            </li>
          ))}
        </ol>
      )}
    </div>
  )
}

export default History
