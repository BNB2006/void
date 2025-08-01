import { ArrowRight, Search } from "lucide-react";
import { useEffect, useState } from "react";
export function HomePage(){
    const [currentTime, setcurrentTime] = useState(new Date())

    useEffect(() => {
    const timer = setInterval(() => setcurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, []);


    return(
        <div className="bg-[url(https://wallpaperaccess.com/full/14672884.jpg)] bg-cover bg-center w-full h-full">
            <div className="border flex flex-col h-full w-full items-center">
                <div className="flex flex-col items-center justify-center text-3xl py-10">
                    <p>{currentTime.toLocaleDateString([], {weekday: "long", day:"2-digit", month:"short"})}</p>
                    <p>{currentTime.toLocaleTimeString([], {hour: "2-digit", minute:"2-digit"})}</p>
                </div>

                <div className="flex items-center bg-black/40 rounded">
                    <input type="text" className=" p-2 w-100 outline-none" placeholder="Search Sharingan or Enter URl"/>
                    <button className="p-2 border-l"><Search/></button>
                </div>
                {/* <div>Cards</div> */}
            </div>
        </div>
    )
}