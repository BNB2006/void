"use client"

import { useState } from "react"


export function Calculator() {
  const [display, setDisplay] = useState("0")
  const [previousValue, setPreviousValue] = useState(null)
  const [operation, setOperation] = useState(null)
  const [waitingForOperand, setWaitingForOperand] = useState(false)
  

  const calculate = (firstOperand, secondOperand, operation) => {
    switch (operation) {
      case "+":
        return firstOperand + secondOperand
      case "-":
        return firstOperand - secondOperand
      case "*":
        return firstOperand * secondOperand
      case "/":
        return firstOperand / secondOperand
      case "=":
        return secondOperand
      default:
        return secondOperand
    }
  }

  
  const handleNumber = (num) => {
    if (waitingForOperand) {
      setDisplay(String(num))
      setWaitingForOperand(false)
    } else {
      setDisplay(display === "0" ? String(num) : display + num)
    }
  }

  const handleOperation = (nextOperation) => {
    const inputValue = Number.parseFloat(display)

    if (previousValue === null) {
      setPreviousValue(inputValue)
    } else if (operation) {
      const currentValue = previousValue || 0
      const newValue = calculate(currentValue, inputValue, operation)
      setDisplay(String(newValue))
      setPreviousValue(newValue)
    }

    setWaitingForOperand(true) 
    setOperation(nextOperation)
  }

  const handleClear = () => {
    setDisplay("0")
    setPreviousValue(null)
    setOperation(null)
    setWaitingForOperand(false)
  }

  const buttons = [
    ["C", "±", "%", "/"],
    ["7", "8", "9", "*"], 
    ["4", "5", "6", "-"], 
    ["1", "2", "3", "+"], 
    ["0", ".", "="], 
  ]

  return (
    <div className="bg-[#333232] h-full flex items-center justify-center">
      <div className="w-100 p-2 bg-[#222222]">
        <div className="bg-black text-white text-right text-5xl p-4 mb-2 rounded">{display}</div>

      <div className="grid gap-1">
        {buttons.map((row, i) => (
          <div key={i} className="grid grid-cols-4 gap-1">
            {row.map((btn) => (
              <button
                key={btn}
                className={`
                  h-15 rounded border
                  ${
                    ["+", "-", "*", "/", "="].includes(btn)
                      ? "bg-blue-500 text-white hover:bg-blue-600" 
                      : "bg-gray-300 hover:bg-gray-400"
                  }
                  ${btn === "0" ? "col-span-2" : ""} // Zero button spans 2 columns
                `}
                onClick={() => {
                  if (btn === "C") {
                    handleClear()
                  } else if (["+", "-", "*", "/", "="].includes(btn)) {
                    handleOperation(btn)
                  } else if (btn !== "±" && btn !== "%") {
                    handleNumber(btn)
                  }
                }}
              >
                {btn}
              </button>
            ))}
          </div>
        ))}
      </div>
      </div>
    </div>
  )
}
