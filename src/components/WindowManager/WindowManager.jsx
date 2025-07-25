"use client"

import { useState, useCallback, createContext, useContext } from "react"
import { Window } from "../Window/Window.jsx"

export const WindowManagerContext = createContext({
  windows: [],
  openWindow: () => {},
  closeWindow: () => {},
  minimizeWindow: () => {},
  maximizeWindow: () => {},
  focusWindow: () => {},
  restoreWindow: () => {},
})

export function useWindowManager() {
  return useContext(WindowManagerContext)
}


export function WindowManager({ children }) {
  const [windows, setWindows] = useState([])
  const [nextZIndex, setNextZIndex] = useState(1000)
  console.log("WindowManager rendering, windows:", windows.length)

  const openWindow = useCallback(
    (app) => {
      console.log("Opening window for app:", app.id)

      const existingWindow = windows.find((w) => w.id === app.id)

      if (existingWindow) {
        if (existingWindow.isMinimized) {
          restoreWindow(app.id)
        } else {
          focusWindow(app.id)
        }
        return 
      }

      const newWindow = {
        id: app.id, 
        title: app.title,
        icon: app.icon,  
        component: app.component, 
        isMinimized: false, 
        isMaximized: false, 
        position: { 
          x: 100 + windows.length * 30, 
          y: 100 + windows.length * 30, 
        },
        size: app.defaultSize || { width: 400, height: 300 }, 
        zIndex: nextZIndex, 
      }

      setWindows((prev) => [...prev, newWindow])
      console.log("Window added, new count:", windows.length + 1) 

      setNextZIndex((prev) => prev + 1)
    },
    [windows, nextZIndex], 
  )

 
  const closeWindow = useCallback((id) => {
    console.log("Closing window:", id) 
    setWindows((prev) => prev.filter((w) => w.id !== id))
  }, [])

 
  const minimizeWindow = useCallback((id) => {
    console.log("Minimizing window:", id) 
    setWindows((prev) =>
      prev.map((w) =>
        w.id === id
          ? { ...w, isMinimized: true } 
          : w,
      ),
    )
  }, [])


  const restoreWindow = useCallback(
    (id) => {
      console.log("Restoring window:", id) 
      setWindows((prev) =>
        prev.map((w) =>
          w.id === id
            ? { ...w, isMinimized: false, zIndex: nextZIndex } 
            : w,
        ),
      )
      setNextZIndex((prev) => prev + 1) 
    },
    [nextZIndex],
  )


  const maximizeWindow = useCallback((id) => {
    console.log("Maximizing window:", id) 
    setWindows((prev) =>
      prev.map((w) =>
        w.id === id
          ? { ...w, isMaximized: !w.isMaximized } 
          : w,
      ),
    )
  }, [])

 
  const focusWindow = useCallback(
    (id) => {
      console.log("Focusing window:", id) 
      setWindows((prev) =>
        prev.map((w) =>
          w.id === id
            ? { ...w, zIndex: nextZIndex } 
            : w,
        ),
      )
      setNextZIndex((prev) => prev + 1) 
    },
    [nextZIndex],
  )

 
  const updateWindowPosition = useCallback((id, position) => {
    setWindows((prev) =>
      prev.map((w) =>
        w.id === id
          ? { ...w, position } 
          : w,
      ),
    )
  }, [])

  // Context value with all window management functions
  const contextValue = {
    windows,
    openWindow,
    closeWindow,
    minimizeWindow,
    maximizeWindow,
    focusWindow,
    restoreWindow, 
    updateWindowPosition,
  }

  return (
    <WindowManagerContext.Provider value={contextValue}>
      <div className="relative w-full h-full"> 
        {children} 
        {windows.map(
          (window) =>
            !window.isMinimized && ( // Only render if not minimized
              <Window
                key={window.id}
                id={window.id}
                title={window.title}
                icon={window.icon}
                position={window.position}
                size={window.size}
                isMaximized={window.isMaximized}
                zIndex={window.zIndex}
                onClose={() => closeWindow(window.id)}
                onMinimize={() => minimizeWindow(window.id)}
                onMaximize={() => maximizeWindow(window.id)}
                onFocus={() => focusWindow(window.id)}
                onPositionChange={(position) => updateWindowPosition(window.id, position)}
              >
                {window.component} 
              </Window>
            ),
        )}
      </div>
    </WindowManagerContext.Provider>
  )
}
