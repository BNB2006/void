
import { useEffect, useState } from "react"
import { Desktop } from "./components/Desktop/Desktop"
import { Taskbar } from "./components/Taskbar/Taskbar"
import { WindowManager } from "./components/WindowManager/WindowManager"

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if(prev >= 100){
          clearInterval(interval);
          setTimeout(() => {
            setIsLoading(false)
          }, 500);
          return 100;
        }
        return prev+10
      })
    }, 200);
  
    return () => clearInterval(interval)
  }, [])
  

  if(isLoading){
    return(
      <div className="flex items-center justify-center h-screen bg-black text-white">
        <div className="w-80">
          <h2 className="text-center mb-4">Loading...</h2>
            <div className="bg-white h-0.5 rounded-full transition-all duration-300 ease-out" 
              style={{width:`${progress}%`}}></div>
          <p className="text-center mt-4">{progress}%</p>
        </div>
      </div>
    )
  }
  

  return (
    <div className="h-screen w-full overflow-hidden">
      <WindowManager>
        <Desktop/>
        <Taskbar/>
    </WindowManager>
    </div>
  )
}

export default App
