import React, { useState, useEffect } from "react"

import ClipboardIcon from "../assets/clipboard.svg"
import PlusIcon from "../assets/plus.svg"
import LessIcon from "../assets/dash.svg"
import HistoryIcon from "../assets/clock-history.svg"
import TrashIcon from "../assets/trash.svg"
import XIcon from "../assets/x-circle-fill.svg"

import History from "./History"

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
  const [isInverselyProportional, setIsInverselyProportional] = useState(false)

  useEffect(() => {
    switch (isInverselyProportional) {
      case false:
        setD((Number(c) * Number(b)) / Number(a))
        break
      case true:
        setD((Number(a) * Number(b)) / Number(c))
        break
    }
  }, [a, b, c, isInverselyProportional])

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

  const clearInputs = () => {
    setA(undefined)
    setB(undefined)
    setC(undefined)
    setD(undefined)
  }

  return (
    <div className="grid place-items-center gap-3">
      <div className="flex items-center">
        <input
          type="number"
          className="input input-bordered p-4 w-32 max-w-xs transition-all duration-300 ease-in-out"
          maxLength={18}
          onChange={(e) =>
            setA(e.target.value ? Number(e.target.value) : undefined)
          }
          value={a ?? ""}
        />
        <span className="w-24 text-center cg-medium bg-base-200 leading-8">
          está para
        </span>
        <input
          type="number"
          className="input input-bordered p-4 w-32 max-w-xs transition-all duration-300 ease-in-out"
          maxLength={18}
          onChange={(e) =>
            setB(e.target.value ? Number(e.target.value) : undefined)
          }
          value={b ?? ""}
        />
      </div>
      <span className="w-24 text-center cg-bold text-md">ASSIM COMO</span>
      <div className="flex items-center">
        <input
          type="number"
          className="input input-bordered p-4 w-32 max-w-xs transition-all duration-300 ease-in-out"
          maxLength={18}
          onChange={(e) =>
            setC(e.target.value ? Number(e.target.value) : undefined)
          }
          value={c ?? ""}
        />
        <span className="w-24 text-center cg-medium bg-base-200 leading-8">
          está para
        </span>
        <input
          type="number"
          className="resultado input input-bordered input-primary p-4 w-32 max-w-xs bg-primary text-black cg-bold transition-all duration-300 ease-in-out"
          maxLength={18}
          readOnly
          value={d?.toFixed(decimalPlaces) ?? ""}
        />
      </div>
      <div className="grid gap-2">
        <div className="form-control">
          <label className="label cursor-pointer rounded-lg p-3 hover:bg-base-400 transition-all duration-300 ease-in-out active:bg-base-200">
            <input
              type="checkbox"
              className="toggle"
              checked={isInverselyProportional}
              onChange={() =>
                setIsInverselyProportional(!isInverselyProportional)
              }
            />
            <span className="label-text font-medium">
              Inversamente proporcional
            </span>
          </label>
        </div>
        <button
          className="btn btn-secondary border-[1px] border-[#BE192C]"
          onClick={clearInputs}
        >
          <div className="flex gap-2 items-center">
            <img src={XIcon} />
            <span>Limpar campos</span>
          </div>
        </button>
        <div className="flex gap-2">
          <button
            className="btn btn-accent w-36 border-[1px] border-[#D48617]"
            onClick={increaseDecimalPlaces}
          >
            <div className="flex gap-2 items-center">
              <img src={PlusIcon} />
              <span>Aumentar casas decimais</span>
            </div>
          </button>
          <button
            className="btn btn-accent w-36 border-[1px] border-[#D48617]"
            onClick={decreaseDecimalPlaces}
          >
            <div className="flex gap-2 items-center">
              <img src={LessIcon} />
              <span>Reduzir casas decimais</span>
            </div>
          </button>
        </div>
        <div className="flex gap-2">
          <button
            className="btn btn-neutral w-36 border-[1px] border-[#818180]"
            onClick={addToHistory}
          >
            <div className="flex gap-2 items-center">
              <img src={HistoryIcon} />
              <span>Adicionar ao Histórico</span>
            </div>
          </button>
          <button
            className="btn btn-secondary w-36 border-[1px] border-[#BE192C]"
            onClick={clearHistory}
          >
            <div className="flex gap-2 items-center">
              <img src={TrashIcon} />
              <span>Limpar Histórico</span>
            </div>
          </button>
        </div>
        <button
          className="btn btn-primary tooltip border-[1px] border-[#239A8E]"
          data-tip={tooltipText}
          onClick={copyToClipboard}
        >
          <div className="flex justify-center items-center gap-2">
            <img src={ClipboardIcon} width="16" height="16" />
            <span>Copiar resultado</span>
          </div>
        </button>
      </div>

      {/* Passar o estado do histórico para o componente History */}
      <History history={history} />
    </div>
  )
}

export default Inputs
