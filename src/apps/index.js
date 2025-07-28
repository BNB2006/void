import React from "react"
import { Calculator } from './Claculator/Calculator'
import { Terminal } from "./Terminal/Terminal"
import { FileExplorer } from "./FileExplorer/FileExplorer"
import {  Google } from "./Iframe_Apps/Google"
import { VSCode } from "./Iframe_Apps/VSCode"

 
export const apps = [
  {
    id: "Google",
    title: "Google",
    icon: React.createElement("img", {
      src: "https://cdn-icons-png.flaticon.com/128/300/300221.png",
      alt: "Goggle",
      width: 34,
    }),
    component: React.createElement(Google),
    defaultSize: { width: 700, height: 400 },
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
  {
    id: "fileExplorer",
    title: "File Explorer",
    icon: React.createElement("img", {
      src: "https://cdn-icons-png.flaticon.com/128/11014/11014574.png",
      alt: "File Explorer",
      width: 34,
    }),
    component: React.createElement(FileExplorer),
    defaultSize: { width: 500, height: 350 },
  },
  {
    id: "vsCode",
    title: "VS Code",
    icon: React.createElement("img", {
      src: "https://vs-lite.vercel.app/vs-code.svg",
      alt: "VS code",
      width: 34,
    }),
    component: React.createElement(VSCode),
    defaultSize: { width: 600, height: 400 },
  },
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
  
]

 
export const getAppById = (id) => apps.find((app) => app.id === id)
