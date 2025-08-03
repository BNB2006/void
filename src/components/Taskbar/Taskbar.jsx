"use client"

import { Menu, Wifi, Volume2, Battery, CloudSun, BatteryMedium, HeadphoneOff, Headphones, Settings, BatteryFull, Sun, Cpu, Power, RefreshCcw, Lock, Moon, LogOut, ThermometerSunIcon, SkipBack, Play, SkipForward } from "lucide-react"
import { useState, useEffect } from "react"
import { useWindowManager } from '../WindowManager/WindowManager'

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

              <div onClick={() => setSideBar(true)} className="px-2 rounded-md hover:bg-gray-900">
                Sidebar
              </div>
              <div className="text-[12px] px-2 rounded-md hover:bg-gray-900 flex flex-col text-end">
                <span>{currentTime.toLocaleTimeString([], {hour: "2-digit", minute:"2-digit"})}</span>
                <span>{currentTime.toLocaleDateString()}</span>
              </div>
          </div>


          <div className="absolute right-2 bottom-15 w-70">

            <div className="py-1">
              <div className="grid grid-cols-3">
                <div className="w-18 p-1 bg-gray-900 rounded-md flex flex-col items-center justify-center">
                  <div className="text-red-400 text-2xl">31</div>
                  <div className="">Dec</div>
                </div>
                <div className="col-span-2  bg-gray-900 rounded-md flex items-center justify-between">
                  <div className="p-3 ml-4 text-blue-400"><CloudSun size={34}/></div>
                  <div className="mr-5 text-sm text-center py-2">
                    <div className="flex items-center gap-2">28°C <ThermometerSunIcon className="text-yellow-200"/></div>
                    <div className="text-red-400">Sun</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="py-1">
              <div className=" bg-gray-900 rounded-md flex items-center px-9 gap-2 p-2">
                <div className="w-16 h-16">
                  <img src="https://cdnl.iconscout.com/lottie/premium/thumb/sand-timer-7081187-5744882.gif" alt="" className="" />
                </div>
                <div className="flex flex-col items-center justify-center">
                <div className="text-4xl">21 : <span className="text-red-400">06</span></div>
                <div className="text-green-400">Monday</div>
                </div>
              </div>
            </div>

            <div className="py-1">
              <div className=" bg-gray-900 flex gap-2 p-3 rounded-md">
                <div className="w-30 mr-5"><img src="/bg.jpg" alt="" className="rounded" /></div>
                <div className="flex flex-col items-center justify-center">
                  <div className="text-lg text-red-200">Phillips</div>
                  <div className="flex items-center gap-3 mt-1">
                    <SkipBack/>
                    <Play className="text-red-400"/>
                    <SkipForward/>
                  </div>
                </div>
              </div>
            </div>

            <div className="py-1">
              <div className=" bg-gray-900 rounded-md p-7">

                <div className="flex items-center space-x-3 py-1">
                  <div className="text-purple-400"><Headphones/></div>
                  <div className="flex-1 bg-gray-600 rounded-full h-2 relative">
                    <div className="bg-purple-400 h-2 rounded-full w-2/4"></div>
                  </div>
              </div>

                <div className="flex items-center space-x-3 py-1">
                  <div className="text-red-400"><Sun/></div>
                  <div className="flex-1 bg-gray-600 rounded-full h-2 relative">
                    <div className="bg-red-400 h-2 rounded-full w-3/4"></div>
                  </div>
              </div>

                <div className="flex items-center space-x-3 py-1">
                  <div className="text-blue-400"><Cpu/></div>
                  <div className="flex-1 bg-gray-600 rounded-full h-2 relative">
                    <div className="bg-blue-400 h-2 rounded-full w-1/4"></div>
                  </div>
              </div>
 
                <div className="flex items-center space-x-3 py-1">
                  <div className="text-green-400"><BatteryMedium/></div>
                  <div className="flex-1 bg-gray-600 rounded-full h-2 relative">
                    <div className="bg-green-400 h-2 rounded-full w-3/4"></div>
                  </div>
              </div>

              </div>
            </div>

            <div className="py-1">
              <div className=" bg-gray-900 rounded-md p-7">
                <input type="text" className="bg-gray-600 p-1 rounded-md ml-2 text-center outline-none" placeholder="🔍Seach..." />
                <div className="flex items-center justify-around mt-3">
                  <Power className="text-red-400"/>
                  <RefreshCcw className="text-violet-300"/>
                  <Lock className="text-green-300"/>
                  <Moon className="text-blue-300"/>
                  <LogOut className="text-orange-300"/>
                </div>
              </div>
            </div>
          </div>

              
    </div>
  )
}
