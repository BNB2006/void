import React from "react"
import { Calculator } from './Claculator/Calculator'
import { CalculatorIcon, FileText } from "lucide-react"

 
export const apps = [
  {
    id: "calculator",
    title: "Calculator",
    icon: React.createElement(CalculatorIcon, { size: 16 }),
    component: React.createElement(Calculator),
    defaultSize: { width: 300, height: 400 },
  },
]

 
export const getAppById = (id) => apps.find((app) => app.id === id)
