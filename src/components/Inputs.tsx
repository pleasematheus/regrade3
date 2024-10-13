import React, { useState, useEffect } from "react"
import Clipboard from "../assets/clipboard.svg"
import History from "./History" // Importe o componente History

const Inputs: React.FC = () => {
  const [a, setA] = useState<number | undefined>(undefined)
  const [b, setB] = useState<number | undefined>(undefined)
  const [c, setC] = useState<number | undefined>(undefined)
  const [d, setD] = useState<number | undefined>(undefined)
  const [decimalPlaces, setDecimalPlaces] = useState<number>(2)
  const [tooltipText, setTooltipText] = useState<string>(
    "Copie o resultado para a área de transferência"
  )
  const [history, setHistory] = useState<Array<string>>(() => {
    // Carrega o histórico do localStorage
    const savedHistory = localStorage.getItem("calculationHistory")
    return savedHistory ? JSON.parse(savedHistory) : []
  })

  useEffect(() => {
    if (a && b && c) {
      setD((Number(c) * Number(b)) / Number(a))
    }
  }, [a, b, c])

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(d?.toFixed(decimalPlaces) || "")
      .catch((err) => {
        console.error("Erro ao copiar: ", err)
      })

    setTooltipText("Copiado!")

    setTimeout(() => {
      setTooltipText("Copie o resultado para a área de transferência")
    }, 1500)
  }

  const increaseDecimalPlaces = () => {
    setDecimalPlaces((prev) => Math.min(prev + 1, 10))
  }

  const decreaseDecimalPlaces = () => {
    setDecimalPlaces((prev) => Math.max(prev - 1, 0))
  }

  const addToHistory = () => {
    if (d !== undefined) {
      const newEntry = `(${c} * ${b}) / ${a} = ${d.toFixed(decimalPlaces)}`
      setHistory((prev) => {
        const updatedHistory = [...prev, newEntry]
        // Salva no localStorage em tempo real
        localStorage.setItem(
          "calculationHistory",
          JSON.stringify(updatedHistory)
        )
        return updatedHistory
      })
    }
  }

  const clearHistory = () => {
    setHistory([])
    localStorage.removeItem("calculationHistory") // Remove do localStorage
  }

  return (
    <div className="grid place-items-center gap-3">
      <div className="flex items-center gap-3">
        <input
          type="number"
          className="input input-bordered p-4 w-32 max-w-xs"
          maxLength={18}
          onChange={(e) =>
            setA(e.target.value ? Number(e.target.value) : undefined)
          }
          value={a ?? ""}
        />
        <span className="w-24 text-center">esta para</span>
        <input
          type="number"
          className="input input-bordered p-4 w-32 max-w-xs"
          maxLength={18}
          onChange={(e) =>
            setB(e.target.value ? Number(e.target.value) : undefined)
          }
          value={b ?? ""}
        />
      </div>
      <div className="flex items-center gap-3">
        <input
          type="number"
          className="input input-bordered p-4 w-32 max-w-xs"
          maxLength={18}
          onChange={(e) =>
            setC(e.target.value ? Number(e.target.value) : undefined)
          }
          value={c ?? ""}
        />
        <span className="w-24 text-center">assim como</span>
        <input
          type="number"
          className="input input-bordered p-4 w-32 max-w-xs"
          maxLength={18}
          readOnly
          value={d?.toFixed(decimalPlaces) ?? ""}
        />
      </div>
      <div className="flex gap-2">
        <button className="btn" onClick={increaseDecimalPlaces}>
          Aumentar casas decimais
        </button>
        <button className="btn" onClick={decreaseDecimalPlaces}>
          Reduzir casas decimais
        </button>
        <button className="btn" onClick={addToHistory}>
          Adicionar ao Histórico
        </button>
        <button className="btn btn-danger" onClick={clearHistory}>
          Limpar Histórico
        </button>
      </div>
      <button
        className="btn btn-primary tooltip"
        data-tip={tooltipText}
        onClick={copyToClipboard}
      >
        <div className="flex gap-2 items-center">
          <img src={Clipboard} width="16" height="16" />
          <span>Copiar</span>
        </div>
      </button>

      {/* Passar o estado do histórico para o componente History */}
      <History history={history} />
    </div>
  )
}

export default Inputs