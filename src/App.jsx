import Desktop from "./components/DeskTop"
import Taskbar from "./components/Taskbar"

function App() {

  return (
    <div className="h-screen w-full overflow-hidden">
    <Desktop/>
    <Taskbar/>
    </div>
  )
}

export default App
