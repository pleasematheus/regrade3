import React, { useState, useReducer, useRef, useMemo } from "react";

import ClipboardIcon from "../assets/clipboard.svg";
import PlusIcon from "../assets/plus.svg";
import LessIcon from "../assets/dash.svg";
import HistoryIcon from "../assets/clock-history.svg";
import TrashIcon from "../assets/trash.svg";
import XIcon from "../assets/x-circle-fill.svg";

import History from "./History";

const STORAGE_KEY = "calculationHistory:v1";
const LEGACY_STORAGE_KEY = "calculationHistory";

type CalculatorState = {
  a: number | string;
  b: number | string;
  c: number | string;
  decimalPlaces: number;
  isInverselyProportional: boolean;
};

type CalculatorAction =
  | { type: "setField"; field: "a" | "b" | "c"; value: string }
  | { type: "increaseDecimal" }
  | { type: "decreaseDecimal" }
  | { type: "toggleProportional" }
  | { type: "clearInputs" };

function calculatorReducer(
  state: CalculatorState,
  action: CalculatorAction,
): CalculatorState {
  switch (action.type) {
    case "setField":
      return { ...state, [action.field]: action.value };
    case "increaseDecimal":
      return { ...state, decimalPlaces: Math.min(state.decimalPlaces + 1, 10) };
    case "decreaseDecimal":
      return { ...state, decimalPlaces: Math.max(state.decimalPlaces - 1, 0) };
    case "toggleProportional":
      return {
        ...state,
        isInverselyProportional: !state.isInverselyProportional,
      };
    case "clearInputs":
      return { ...state, a: "", b: "", c: "" };
  }
}

function loadHistory(): Array<string> {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) return JSON.parse(data);
    const legacy = localStorage.getItem(LEGACY_STORAGE_KEY);
    if (legacy) {
      const parsed = JSON.parse(legacy);
      localStorage.setItem(STORAGE_KEY, legacy);
      localStorage.removeItem(LEGACY_STORAGE_KEY);
      return parsed;
    }
  } catch {
    // Corrupted data — start fresh
  }
  return [];
}

function handleEnterKey(
  nextRef: React.RefObject<HTMLInputElement | null>,
) {
  return (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      nextRef.current?.focus();
    }
  };
}

const Inputs: React.FC = () => {
  const [state, dispatch] = useReducer(calculatorReducer, {
    a: "",
    b: "",
    c: "",
    decimalPlaces: 2,
    isInverselyProportional: false,
  });
  const { a, b, c, decimalPlaces, isInverselyProportional } = state;

  const [tooltipClipboard, setTooltipClipboard] = useState<string>(
    "Copie o resultado para a área de transferência",
  )
  const [tooltipHistory, setTooltipHistory] = useState<string>(
    "Adicionar ao histórico de cálculos",
  )
  const [history, setHistory] = useState<Array<string>>(loadHistory)

  const inputARef = useRef<HTMLInputElement>(null)
  const inputBRef = useRef<HTMLInputElement>(null)
  const inputCRef = useRef<HTMLInputElement>(null)

  const d = useMemo(() => {
    const numA = Number(a)
    const numB = Number(b)
    const numC = Number(c)
    const divisor = isInverselyProportional ? numC : numA

    if (a && b && c && divisor !== 0) {
      return isInverselyProportional
        ? (numA * numB) / numC
        : (numC * numB) / numA
    }
    return ""
  }, [a, b, c, isInverselyProportional])

  const copyToClipboard = () => {
    if (d !== undefined && !isNaN(Number(d))) {
      navigator.clipboard
        .writeText(Number(d).toFixed(decimalPlaces) || "")
        .catch((err) => {
          console.error("Erro ao copiar: ", err)
        })

      setTooltipClipboard("Copiado!")

      setTimeout(() => {
        setTooltipClipboard("Copie o resultado para a área de transferência")
      }, 1500)
    }
  }

  const addToHistory = () => {
    if (typeof d === "number" && !isNaN(d)) {
      const newEntry = `${a} está para ${b} assim como ${c} está para ${Number(d).toFixed(decimalPlaces)}`
      setHistory((prev) => {
        const updatedHistory = [...prev, newEntry]
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedHistory))

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
    localStorage.removeItem(STORAGE_KEY)
  }

  return (
    <div className="grid place-items-center gap-3">
      {/* Campos de entrada e resultado */}
      <div className="flex items-center">
        {/* Campo A */}
        <input
          ref={inputARef}
          type="number"
          step="any"
          className="input input-bordered rounded-lg p-4 h-12 w-32 text-base transition-all duration-300 ease-in-out"
          onChange={(e) => dispatch({ type: "setField", field: "a", value: e.target.value })}
          onKeyDown={handleEnterKey(inputBRef)}
          value={a ?? ""}
          placeholder="Campo A"
          aria-label="Campo A"
        />
        <span className="w-24 text-center cg-medium bg-base-200 leading-8">
          está para
        </span>
        {/* Campo B */}
        <input
          ref={inputBRef}
          type="number"
          step="any"
          className="input input-bordered rounded-lg p-4 h-12 w-32 text-base transition-all duration-300 ease-in-out"
          onChange={(e) => dispatch({ type: "setField", field: "b", value: e.target.value })}
          onKeyDown={handleEnterKey(inputCRef)}
          value={b ?? ""}
          placeholder="Campo B"
          aria-label="Campo B"
        />
      </div>
      <span className="w-24 text-center cg-bold text-md">ASSIM COMO</span>
      <div className="flex items-center">
        {/* Campo C */}
        <input
          ref={inputCRef}
          type="number"
          step="any"
          className="input input-bordered rounded-lg p-4 h-12 w-32 text-base transition-all duration-300 ease-in-out"
          onChange={(e) => dispatch({ type: "setField", field: "c", value: e.target.value })}
          onKeyDown={handleEnterKey(inputARef)}
          value={c ?? ""}
          placeholder="Campo C"
          aria-label="Campo C"
        />
        <span className="w-24 text-center cg-medium bg-base-200 leading-8">
          está para
        </span>
        {/* Campo D (resultado) */}
        <input
          type="text"
          inputMode="numeric"
          className="resultado input input-bordered rounded-lg p-4 h-12 w-32 text-base max-w-xs bg-primary text-black cg-bold transition-all duration-300 ease-in-out border border-[#239A8E]"
          maxLength={18}
          readOnly
          value={typeof d === "number" ? d.toFixed(decimalPlaces) : ""}
          placeholder="Resultado"
          aria-label="Resultado"
        />
      </div>

      {/* Botões de ação */}
      <div className="grid gap-2">
        <div className="form-control">
          <label className="label cursor-pointer rounded-md p-3 w-full justify-between hover:bg-base-400 transition duration-300 ease-in-out active:bg-base-200">
            <input
              type="checkbox"
              className="toggle transition-all duration-300 ease-in-out focus:ring-current focus:outline-2 focus:outline-offset-0 focus:outline-current"
              checked={isInverselyProportional}
              onChange={() => dispatch({ type: "toggleProportional" })}
            />
            <span className="label-text font-medium text-sm text-current">
              Inversamente proporcional
            </span>
          </label>
        </div>
        <button
          type="button"
          className="btn btn-secondary border border-[#BE192C] rounded-lg h-12 transition-all duration-300 ease-in-out focus:ring-2 focus:ring-[#BE192C] focus:outline-0"
          onClick={() => dispatch({ type: "clearInputs" })}
        >
          <div className="flex gap-2 items-center">
            <img src={XIcon} alt="" />
            <span>Limpar campos</span>
          </div>
        </button>
        <div className="flex gap-2">
          <button
            type="button"
            className="btn btn-accent w-36 border border-[#D48617] rounded-lg h-12 transition-all duration-300 ease-in-out focus:ring-2 focus:ring-[#D48617] focus:outline-0 leading-none"
            onClick={() => dispatch({ type: "increaseDecimal" })}
          >
            <div className="flex gap-2 items-center">
              <img src={PlusIcon} alt="" />
              <span>Aumentar casas decimais</span>
            </div>
          </button>
          <button
            type="button"
            className="btn btn-accent w-36 border border-[#D48617] rounded-lg h-12 transition-all duration-300 ease-in-out focus:ring-2 focus:ring-[#D48617] focus:outline-0 leading-none"
            onClick={() => dispatch({ type: "decreaseDecimal" })}
          >
            <div className="flex gap-2 items-center">
              <img src={LessIcon} alt="" />
              <span>Reduzir casas decimais</span>
            </div>
          </button>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            className="btn btn-neutral tooltip w-36 border border-[#818180] rounded-lg h-12 transition-all duration-300 ease-in-out focus:ring-2 focus:ring-[#818180] focus:outline-0 leading-none"
            data-tip={tooltipHistory}
            onClick={addToHistory}
          >
            <div className="flex gap-2 items-center">
              <img src={HistoryIcon} alt="" />
              <span>Adicionar ao Histórico</span>
            </div>
          </button>
          <button
            type="button"
            className="btn btn-secondary w-36 border border-[#BE192C] rounded-lg h-12 text-sm transition-all duration-300 ease-in-out focus:ring-2 focus:ring-[#BE192C] focus:outline-0 leading-none"
            onClick={clearHistory}
          >
            <div className="flex gap-2 items-center">
              <img src={TrashIcon} alt="" />
              <span>Limpar Histórico</span>
            </div>
          </button>
        </div>
        <button
          type="button"
          className="btn btn-primary tooltip tooltip-primary border border-[#239A8E] rounded-lg h-12 text-sm transition-all duration-300 ease-in-out focus:ring-2 focus:ring-[#239A8E] focus:outline-0 leading-none"
          data-tip={tooltipClipboard}
          onClick={copyToClipboard}
        >
          <div className="flex justify-center items-center gap-2">
            <img src={ClipboardIcon} width="16" height="16" alt="" />
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
