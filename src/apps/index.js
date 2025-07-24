import React from "react" 
import { CalculatorIcon, FileText } from "lucide-react"
import { Calculator } from "./Claculator/Calculator"


/**
 * Alternative approach: Create icon components as functions
 * This is cleaner and more readable
 */

// Register all your apps here
export const apps = [
  {
    id: "calculator",
    title: "Calculator",
    icon: React.createElement(CalculatorIcon, { size: 16 }),
    component: React.createElement(Calculator),
    defaultSize: { width: 400, height: 300 }
  },
  {
    id: "calculator",
    title: "Calculator",
    icon: React.createElement(CalculatorIcon, { size: 16 }),
    component: React.createElement(Calculator),
    defaultSize: { width: 400, height: 300 }
  },
  {
    id: "calculator",
    title: "Calculator",
    icon: React.createElement(CalculatorIcon, { size: 16 }),
    component: React.createElement(Calculator),
    defaultSize: { width: 400, height: 300 }
  },

]



/**
 * Helper to get app by id
 * @param {string} id - App ID
 * @returns {AppConfig|undefined} App configuration
 */
export const getAppById = (id) => apps.find((app) => app.id === id)
