import { useState } from "react"

export function Browser(){
    const [addressBarValue, setaddressBarValue] = useState("")

    return(
        <div className="w-full h-full">
            <form className="bg-red-400 flex-1 flex items-center">
                <div className="flex items-center flex-1 bg-white border  rounded-full px-3 py-1">
                    <input type="text" 
                        value={addressBarValue} 
                        onChange={(e) => setaddressBarValue(e.target.value)} 
                        className="border"
                    />

                    <button type="submit" className="p-1 hover:bg-gray-100 rounded">
                        🔍
                    </button>
                </div>
            </form>

            <div className="bg-amber-300 w-full h-full">
                <iframe src={addressBarValue}
                className="w-full h-full"
                    frameborder="0">Content</iframe>
                    content will come here
            </div>
        </div>
    )
}