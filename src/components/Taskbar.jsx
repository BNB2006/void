"use client"

import { Menu, Wifi, Volume2, Battery, CloudSun, BatteryMedium } from "lucide-react"
import { useState, useEffect } from "react"
import { useWindowManager } from './WindowManager/WindowManager'

/**
 * Taskbar component - Shows running apps and system info
 */
export function Taskbar() {
  const [currentTime, setCurrentTime] = useState(new Date())
  const { windows, focusWindow, minimizeWindow, restoreWindow } = useWindowManager()

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

  return (
    <div className="fixed bottom-0 left-0 w-full h-12 bg-black/70 backdrop-blur-sm flex items-center justify-between px-4 text-white">
      <div><CloudSun /></div>

        <div className="flex items-center gap-2">
            <input type="text" className="border-1 rounded-2xl p-1" placeholder=" 🔍Search" />
            {windows.map((window) => (
          <button
            key={window.id}
            className={`
              text-white bg-white/20 p-3 rounded 
              flex items-center gap-2
              transition-opacity
              ${window.isMinimized ? "opacity-60" : "opacity-100"}
            `}
            onClick={() => handleTaskbarClick(window)}
            title={window.isMinimized ? `Restore ${window.title}` : `Minimize ${window.title}`} // Tooltip
          >
            {window.icon}
          </button>
        ))}
         </div>

      <div className="flex items-center gap-2">
                <div className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-500">
                    <Wifi size={20} />
                    <Volume2 size={20}/>
                    <BatteryMedium size={20} /></div>
                <div className="text-[12px] gap-2 px-2 rounded-md hover:bg-gray-500 text-end">
                    <div>
                        <p>12:34 PM</p>
                        <p>24-07-2025</p>
                    </div>
                </div>
            </div>
    </div>
  )
}
