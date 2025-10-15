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
  const [tooltipClipboard, setTooltipClipboard] = useState<string>(
    "Copie o resultado para a área de transferência"
  )
  const [tooltipHistory, setTooltipHistory] = useState<string>(
    "Adicionar ao histórico de cálculos"
  )
  const [history, setHistory] = useState<Array<string>>(() => {
    // Carrega o histórico do localStorage
    const savedHistory = localStorage.getItem("calculationHistory")
    return savedHistory ? JSON.parse(savedHistory) : []
  })
  const [isInverselyProportional, setIsInverselyProportional] = useState(false)

  useEffect(() => {
    const [numA, numB, numC] = [a, b, c].map(Number)
    const divisor = isInverselyProportional ? numC : numA

    if ([numA, numB, numC].every((n) => !isNaN(n)) && divisor !== 0) {
      setD(isInverselyProportional ? (numA * numB) / numC : (numC * numB) / numA)
    }
  }, [a, b, c, isInverselyProportional])

  const copyToClipboard = () => {
    if (d !== undefined && !isNaN(d)) {
      navigator.clipboard
        .writeText(d?.toFixed(decimalPlaces) || "")
        .catch((err) => {
          console.error("Erro ao copiar: ", err)
        })

      setTooltipClipboard("Copiado!")

      setTimeout(() => {
        setTooltipClipboard("Copie o resultado para a área de transferência")
      }, 1500)
    }
  }

  const increaseDecimalPlaces = () => {
    setDecimalPlaces((prev) => Math.min(prev + 1, 10))
  }

  const decreaseDecimalPlaces = () => {
    setDecimalPlaces((prev) => Math.max(prev - 1, 0))
  }

  const addToHistory = () => {
    if (d !== undefined && !isNaN(d)) {
      const newEntry = `${a} está para ${b} assim como ${c} está para ${d.toFixed(decimalPlaces)}`
      setHistory((prev) => {
        const updatedHistory = [...prev, newEntry]
        // Salva no localStorage em tempo real
        localStorage.setItem(
          "calculationHistory",
          JSON.stringify(updatedHistory)
        )

        setTooltipHistory("Adicionado")

        setTimeout(() => {
          setTooltipHistory("Adicionar ao histórico de cálculos")
        }, 1500)
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
        {/* Campo A */}
        <input
          type="number"
          // className="input input-bordered p-4 w-32 max-w-xs transition-all duration-300 ease-in-out"
          className="input input-bordered p-4 w-32 transition-all duration-300 ease-in-out focus:ring-2 focus:ring-current focus:outline-0"
          maxLength={18}
          onChange={(e) =>
            setA(e.target.value ? Number(e.target.value) : undefined)
          }
          value={a ?? ""}
          placeholder="Campo A"
        />
        <span className="w-24 text-center cg-medium bg-base-200 leading-8">
          está para
        </span>
        {/* Campo B */}
        <input
          type="number"
          className="input input-bordered p-4 w-32 max-w-xs transition-all duration-300 ease-in-out focus:ring-2 focus:ring-current focus:outline-0"
          maxLength={18}
          onChange={(e) =>
            setB(e.target.value ? Number(e.target.value) : undefined)
          }
          value={b ?? ""}
          placeholder="Campo B"
        />
      </div>
      <span className="w-24 text-center cg-bold text-md">ASSIM COMO</span>
      <div className="flex items-center">
        {/* Campo C */}
        <input
          type="number"
          className="input input-bordered p-4 w-32 max-w-xs transition-all duration-300 ease-in-out focus:ring-2 focus:ring-current focus:outline-0"
          maxLength={18}
          onChange={(e) =>
            setC(e.target.value ? Number(e.target.value) : undefined)
          }
          value={c ?? ""}
          placeholder="Campo C"
        />
        <span className="w-24 text-center cg-medium bg-base-200 leading-8">
          está para
        </span>
        {/* Campo D (resultado) */}
        <input
          type="number"
          className="resultado input input-bordered input-primary p-4 w-32 max-w-xs bg-primary text-black cg-bold transition-all duration-300 ease-in-out border-[1px] border-[#239A8E] focus:ring-2 focus:ring-[#239A8E] focus:outline-0"
          maxLength={18}
          readOnly
          value={d?.toFixed(decimalPlaces) ?? ""}
          placeholder="Resultado"
        />
      </div>
      <div className="grid gap-2">
        <div className="form-control">
          <label className="label cursor-pointer rounded-lg p-3 hover:bg-base-400 transition duration-300 ease-in-out active:bg-base-200">
            <input
              type="checkbox"
              className="toggle transition-all duration-300 ease-in-out focus:ring-current focus:outline-2 focus:outline-offset-0 focus:outline-current"
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
          className="btn btn-secondary border-[1px] border-[#BE192C] transition-all duration-300 ease-in-out focus:ring-2 focus:ring-[#BE192C] focus:outline-0"
          onClick={clearInputs}
        >
          <div className="flex gap-2 items-center">
            <img src={XIcon} />
            <span>Limpar campos</span>
          </div>
        </button>
        <div className="flex gap-2">
          <button
            className="btn btn-accent w-36 border-[1px] border-[#D48617] transition-all duration-300 ease-in-out focus:ring-2 focus:ring-[#D48617] focus:outline-0"
            onClick={increaseDecimalPlaces}
          >
            <div className="flex gap-2 items-center">
              <img src={PlusIcon} />
              <span>Aumentar casas decimais</span>
            </div>
          </button>
          <button
            className="btn btn-accent w-36 border-[1px] border-[#D48617] transition-all duration-300 ease-in-out focus:ring-2 focus:ring-[#D48617] focus:outline-0"
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
            className="btn btn-neutral tooltip w-36 border-[1px] border-[#818180] transition-all duration-300 ease-in-out focus:ring-2 focus:ring-[#818180] focus:outline-0"
            data-tip={tooltipHistory}
            onClick={addToHistory}
          >
            <div className="flex gap-2 items-center">
              <img src={HistoryIcon} />
              <span>Adicionar ao Histórico</span>
            </div>
          </button>
          <button
            className="btn btn-secondary w-36 border-[1px] border-[#BE192C] transition-all duration-300 ease-in-out focus:ring-2 focus:ring-[#BE192C] focus:outline-0"
            onClick={clearHistory}
          >
            <div className="flex gap-2 items-center">
              <img src={TrashIcon} />
              <span>Limpar Histórico</span>
            </div>
          </button>
        </div>
        <button
          className="btn btn-primary tooltip tooltip-primary border-[1px] border-[#239A8E] transition-all duration-300 ease-in-out focus:ring-2 focus:ring-[#239A8E] focus:outline-0"
          data-tip={tooltipClipboard}
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
