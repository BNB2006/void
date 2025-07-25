import { BatteryMedium, CloudSun, Search, Volume2, Wifi } from "lucide-react";

export function Taskbar(){

    return(
        <div className="fixed bottom-0 left-0 w-full h-12 bg-black/70 backdrop-blur-sm flex items-center justify-between px-4 text-white">
            <div><CloudSun /></div>

            <div className="flex items-center gap-2">
                <input type="text" className="border-1 rounded-2xl p-1" placeholder=" 🔍Search" />
                <div>Apps</div>
            </div>

            <div className="flex items-center gap-2">
                <div className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-500">
                    <Wifi size={20} />
                    <Volume2 size={20}/>
                    <BatteryMedium size={20} /></div>
                <div className="text-[11px] gap-2 px-2 rounded-md hover:bg-gray-500">
                    <div>
                        <p>12:34 PM</p>
                        <p>24-07-2025</p>
                    </div>
                </div>
            </div>
        </div>
    )
};

