import { Bell, CircleCheckBig, History, Home, Menu, Mic, Plus, Search, ThumbsUp } from "lucide-react";
import { useState } from "react";

export function Youtube(){
    const [section, setSection] = useState("Home");
    const [isPlaying, setIsPlaying] = useState(false)
    const [play, setPlay] = useState({
        title:"Bal Hanuman Official Trailer Digus Isekai", 
        src:"https://www.youtube.com/embed/_NJvncbpcCA?si=gYlq9oPETJE0ZAcL", 
        channelName:"Diguslsekai", profilePicture:"/assets/image/song2.jpeg",
        views:"301K", postDate:"1 day", subscribers:"24.7M",
    })

    const [videos, setVideos] = useState([
        {id:1, title:"Bal Hanuman Official Trailer Digus Isekai", src:"https://www.youtube.com/embed/_NJvncbpcCA?si=gYlq9oPETJE0ZAcL", 
            thumbnail:"/assets/youtube/thumbnail1.png", views:"389K", postDate:"3 days", channelName:"Diguslsekai", profilePicture:"/assets/image/song1.jpg", subscribers:"24.7M"},
        {id:2, title:"Scott Lang Training Montage | Ant-Man | Official Clip", src:"https://www.youtube.com/embed/jRWvpJNovZ0?si=Kwt3WU8ZAMeqSihD", 
            thumbnail:"/assets/youtube/thumbnail2.png", views:"301K", postDate:"1 day", channelName:"Marvel Entertainment", profilePicture:"/assets/image/song2.jpeg", subscribers:"21.7M"},
        // {id:3, title:"", src:"", 
        //     thumbnail:"", views:"", postDate:"", channelName:"", profilePicture:"", subscribers:""},
    ])

    const playVideo = (videoDetails) => {
        setPlay({title:  videoDetails.title, 
            src:  videoDetails.src, 
            channelName:  videoDetails.channelName, 
            profilePicture:  videoDetails.profilePicture,
            views:  videoDetails.views,
            postDate:  videoDetails.postDate,
            subscribers: videoDetails.subscribers,
        },)
        setIsPlaying(true)
    }

    return(
        <div className="bg-[#0f0f0f] w-full h-full text-white overflow-y-hidden overflow-x-hidden">

            <div className="p-2 flex items-center justify-between">
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
                <div className="w-[13%] min-w-40 h-full p-2">
                    <div className={`flex items-center gap-5 cursor-pointer ${section === "Home" ? 'bg-[#222222] rounded-lg': ''}`} 
                     onClick={()=> {
                        setSection("Home")
                        setIsPlaying(false)
                     }}
                    >
                        <Home size={20} className="ml-2"/>
                        <span className="p-2 text-sm">Home</span>
                    </div>
                    <div className={`flex items-center gap-5 cursor-pointer ${section === "Like" ? 'bg-[#222222] rounded-lg': ''}`} 
                     onClick={()=> {
                        setSection("Like")
                        setIsPlaying(false)
                     }}
                    >
                        <ThumbsUp size={20} className="ml-2"/>
                        <span className="p-2 text-sm">Liked videos</span>
                    </div>
                    <div className={`flex items-center gap-5 cursor-pointer ${section === "History" ? 'bg-[#222222] rounded-lg': ''}`} 
                     onClick={()=> {
                        setSection("History")
                        setIsPlaying(false)
                     }}
                    >
                        <History size={20} className="ml-2"/>
                        <span className="p-2 text-sm">History</span>
                    </div>
                </div>

                {isPlaying ? (
                    <>
                    <div className="flex-1 flex">
                        <div className="w-[900px] h-full">
                        <iframe className="w-[100%] h-[500px] rounded-md" frameborder="0"
                        src={play.src} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                        referrerpolicy="strict-origin-when-cross-origin" allowfullscreen>
                        </iframe>
                        <div className="mt-2 w-[100%]">
                            <p className="text-2xl">{play.title}</p>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-5 mt-2">
                                    <img src="/assets/image/song2.jpeg" className="w-8 h-8 rounded-full" alt="" />
                                    <div>
                                        <p className="text-md flex items-center gap-2">{play.channelName} <CircleCheckBig className="text-blue-500 w-4"/></p>
                                        <p className="text-gray-400 text-xs">{play.subscribers} Subscribers</p>
                                    </div>
                                </div>
                                <div className="px-2">
                                    <p className="bg-[#222222] p-2 rounded">{play.views} views |  {play.postDate} ago</p>
                                </div>
                            </div>
                        </div>
                        </div>

                        <div className=" flex-1 bg-[#222222]  px-2 text-3xl">
                            other videos
                        </div>
                    </div>
                    </>
                ):(
                    <>
                    <div className="h-full flex-1 gap-4 p-2 flex flex-wrap overflow-y-auto">
                        {videos.map((deatils) => (
                        <div className="w-102 cursor-pointer" onClick={() => playVideo(deatils)}>
                            <img src={deatils.thumbnail} className="w-[100%] rounded" alt="" />
                            <div className="flex gap-2 pt-1">
                                <img src={deatils.profilePicture} className="w-8 h-8 rounded-full" alt="" />
                                <div>
                                    <p className="text-sm">{deatils.title}</p>
                                    <p className="text-gray-400 text-xs">{deatils.channelName}</p>
                                    <p className="text-gray-400 text-xs">{deatils.views} views .  {deatils.postDate} ago</p>
                                </div>
                            </div>
                        </div>
                        ))}
                    </div>
                    </>
                )}

            </div>
        </div>
    )
}