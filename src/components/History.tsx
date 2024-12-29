import React, { useEffect } from "react"

const History: React.FC<{ history: Array<string> }> = ({ history }) => {
  useEffect(() => {
    // Salva o histórico no localStorage sempre que ele mudar
    localStorage.setItem("calculationHistory", JSON.stringify(history))
  }, [history])

  return (
    <div className=" max-h-40 overflow-y-auto border rounded-md border-gray-300">
      <h3 className="text-lg text-center font-semibold mt-3">
        Histórico de Cálculos
      </h3>
      <hr className="border-2 mb-3 border-base-200"/>
      <ol className="list-decimal list-inside">
        {history.map((entry, index) => (
          <li key={index}>
            <span className="p-3">{entry}</span>
            <hr className="my-1" />
          </li>
        ))}
      </ol>
    </div>
  )
}

export default History
