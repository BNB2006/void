import { Menu, Wifi, Volume2, Battery, CloudSun, BatteryMedium, HeadphoneOff, Headphones, Settings, BatteryFull, Sun, Cpu, Power, RefreshCcw, Lock, Moon, LogOut, ThermometerSunIcon, SkipBack, Play, SkipForward } from "lucide-react"
import { useEffect, useState } from "react";

export function Sidebar(){
    const [currentTime, setCurrentTime] = useState(new Date())

    useEffect(() => {
      const timer = setInterval(() => {
        setCurrentTime(new Date())
      }, 1000);
    
      return () => {
        clearInterval(timer)
      }
    }, [])
    

    return(
        <div className="absolute right-2 bottom-15 w-70">

            <div className="py-1">
              <div className="grid grid-cols-3">
                <div className="w-18 p-1 bg-gray-900 rounded-md flex flex-col items-center justify-center">
                  <div className="text-red-400 text-2xl">{currentTime.getDate()}</div>
                  <div className="">{currentTime.toLocaleString([], {month: "long"})}</div>
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
                <div className="text-4xl">{currentTime.getHours()} : <span className="text-red-400">{currentTime.getMinutes()}</span></div>
                <div className="text-green-400">{currentTime.toLocaleString([], {weekday: "long"})}</div>
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
    )
}