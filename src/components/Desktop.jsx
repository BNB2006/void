"use client"

import { apps } from "../apps"
import { useWindowManager } from "./WindowManager/WindowManager"


export function Desktop() {
  const { openWindow } = useWindowManager()

  const handleAppOpen = (app) => {
    openWindow(app)
  }

  return (
    <div className="w-screen h-screen text-white p-4 bg-[url(https://images.pexels.com/photos/1172675/pexels-photo-1172675.jpeg)] bg-cover bg-center">
      {/* Desktop Icons Grid */}
      <div className="absolute top-4 left-4 grid gap-4">
        {apps.map((app) => (
          <div
            key={app.id}
            className="
              flex flex-col items-center
              p-2 rounded
              hover:bg-white/20
              cursor-pointer
              transition-colors
              select-none
            "
            onDoubleClick={() => handleAppOpen(app)}
          >
            <div className="p-2 bg-white/20 rounded-lg mb-1">{app.icon}</div>

            <span className="text-xs text-white text-center">{app.title}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
