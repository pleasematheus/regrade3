import React, { useEffect } from "react"

const History: React.FC<{ history: Array<string> }> = ({ history }) => {
  useEffect(() => {
    // Salva o histórico no localStorage sempre que ele mudar
    localStorage.setItem("calculationHistory", JSON.stringify(history))
  }, [history])

  return (
    <div className="mt-5 max-h-40 overflow-y-auto border rounded-md border-gray-300 p-3">
      <h3 className="text-lg font-semibold">Histórico de Cálculos</h3>
      <ul className="list-disc pl-5">
        {history.map((entry, index) => (
          <li key={index}>{entry}</li>
        ))}
      </ul>
    </div>
  )
}

export default History