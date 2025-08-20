import { Bell, History, Home, Menu, Mic, Plus, Search, ThumbsUp } from "lucide-react";
import { useState } from "react";

export function Youtube(){
    const [section, setSection] = useState("Home");

    return(
        <div className="bg-[#0f0f0f] w-full h-full text-white overflow-y-hidden">

            <div className="p-1 flex items-center justify-between">
                <div className=" flex items-center">
                    <button className="mr-2"><Menu/></button>
                    <img src="https://cdn-icons-png.flaticon.com/128/5968/5968852.png" alt="youtube logo" className="w-5"/>
                    <span className="text-white text-xl">YouTube</span>
                </div>

                <div className="flex items-center gap-5">
                    <div className="flex items-center rounded-full border border-gray-400">
                        <input type="text" className="p-2 w-90 outline-none" placeholder="Search..."/>
                        <button type="submit" className="py-2 px-3 bg-[#222222] rounded-r-full"><Search/></button>
                    </div>
                    <div className="bg-[#222222] w-10 h-10 flex items-center justify-center rounded-full"><Mic className=""/></div>
                </div>

                <div className="flex items-center gap-5">
                    <div className="flex items-center gap-1 bg-[#222222]  p-2 rounded-full text-sm "><Plus/><span>Create</span></div>
                    <Bell size={22}/>
                    <div className="rounded-full border w-8 h-8 bg-blue-400"></div>
                </div>
            </div>

            <div className="flex w-full h-full">
                <div className="w-[15%] min-w-40 h-full border-r p-2">
                    <div className={`flex items-center gap-5 cursor-pointer ${section === "Home" ? 'bg-[#222222] rounded-lg': ''}`} onClick={()=> setSection("Home")}>
                        <Home size={20} className="ml-2"/>
                        <span className="p-2 text-sm">Home</span>
                    </div>
                    <div className={`flex items-center gap-5 cursor-pointer ${section === "Like" ? 'bg-[#222222] rounded-lg': ''}`} onClick={()=> setSection("Like")}>
                        <ThumbsUp size={20} className="ml-2"/>
                        <span className="p-2 text-sm">Liked videos</span>
                    </div>
                    <div className={`flex items-center gap-5 cursor-pointer ${section === "History" ? 'bg-[#222222] rounded-lg': ''}`} onClick={()=> setSection("History")}>
                        <History size={20} className="ml-2"/>
                        <span className="p-2 text-sm">History</span>
                    </div>
                </div>

                <div className="bg-green-400 flex-1 p-2">
                    <iframe width="560" height="315" src="https://www.youtube.com/embed/_NJvncbpcCA?si=gYlq9oPETJE0ZAcL" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                </div>
            </div>
        </div>
    )
}