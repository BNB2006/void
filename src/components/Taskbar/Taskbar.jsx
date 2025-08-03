"use client"


import { useState, useEffect } from "react"
import { useWindowManager } from '../WindowManager/WindowManager'
import { Sidebar } from "./Sidebar"

export function Taskbar() {
  const [currentTime, setCurrentTime] = useState(new Date())
  const { windows, focusWindow, minimizeWindow, restoreWindow } = useWindowManager()
  const [sideBar, setSideBar] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])


  const handleTaskbarClick = (window) => {
    console.log("Taskbar clicked for window:", window.id, "isMinimized:", window.isMinimized)

    if (window.isMinimized) {
      restoreWindow(window.id)
    } else {
      minimizeWindow(window.id)
    }
  }

  const toggleSidebar = () => {
    setSideBar(!sideBar);
  }

  return (
    <div className="fixed bottom-0 left-0 w-full rounded h-12 bg-black/50 backdrop-blur-sm flex items-center justify-between px-4 text-white">
      <div><img src="https://img1.picmix.com/output/stamp/normal/5/4/5/3/463545_fd2c9.gif" alt="" className="h-12"/></div>

        <div className="flex items-center gap-2">
            <div className="w-50"></div>
            {windows.map((window) => (
          <button
            key={window.id}
            className={`
              text-white bg-white/20 p-0.5 rounded 
              flex items-center gap-2
              transition-opacity
              ${window.isMinimized ? "opacity-60" : "opacity-100"}
              transition-transform hover:scale-[1.2]
            `}
            onClick={() => handleTaskbarClick(window)}
            title={window.isMinimized ? `Restore ${window.title}` : `Minimize ${window.title}`}
          >
            {window.icon}
          </button>
        ))}
         </div>
         

          <div className="flex items-center gap-2">
              <div onClick={() => toggleSidebar()} className="text-[12px] px-2 rounded-md hover:bg-gray-900 flex flex-col text-end">
                <span>{currentTime.toLocaleTimeString([], {hour: "2-digit", minute:"2-digit"})}</span>
                <span>{currentTime.toLocaleDateString()}</span>
              </div>
          </div>


          {sideBar && <Sidebar/>}

              
    </div>
  )
}
