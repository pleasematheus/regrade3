import React, { useEffect } from "react"

const History: React.FC<{ history: Array<string> }> = ({ history }) => {
  useEffect(() => {
    localStorage.setItem("calculationHistory", JSON.stringify(history))
  }, [history])

  return (
    <div className="max-h-40 overflow-y-auto border rounded-md border-gray-300">
      <h2 className="text-3xl text-center font-bold py-3">
        Histórico de Cálculos
      </h2>
      <hr className="border-2 border-base-200" />
      <ol className="list-decimal">
        {history.map((entry, index) => (
          <React.Fragment key={index}>
            <li className="px-6 py-2 list-inside text-base font-normal subpixel-antialiased scrollbar-hide">
              <span>{entry}</span>
            </li>
            <hr className="border-base-200" />
          </React.Fragment>
        ))}
      </ol>
    </div>
  )
}

export default History
