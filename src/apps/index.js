import React from "react"
import { Calculator } from './Claculator/Calculator'
import { CalculatorIcon, FileText, TerminalIcon } from "lucide-react"
import { Terminal } from "./Terminal/Terminal"

 
export const apps = [
  {
    id: "calculator",
    title: "Calculus",
    icon: React.createElement("img", {
      src: "https://cdn-icons-png.flaticon.com/128/342/342344.png",
      alt: "Calculos",
      width: 34,
    }),
    component: React.createElement(Calculator),
    defaultSize: { width: 300, height: 400 },
  },
  {
    id: "terminal",
    title: "Terminal",
    icon: React.createElement("img", {
      src: "https://cdn-icons-png.flaticon.com/128/11743/11743974.png",
      alt: "Terminal logo",
      width: 34,
    }),
    component: React.createElement(Terminal),
    defaultSize: { width: 400, height: 300 },
  },
]

 
export const getAppById = (id) => apps.find((app) => app.id === id)
