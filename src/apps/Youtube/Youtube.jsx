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
            thumbnail:"/assets/youtube/thumbnail1.png", views:"389K", postDate:"3 days", channelName:"Diguslsekai", 
            profilePicture:"https://yt3.googleusercontent.com/fy3YHjK3ligSA0Dv7ukFO8I9DRrAh3mJjMBSLpf6_fi5G8jmCWmtveAq2Ge3_xuSFvvpJJoHoxI=s160-c-k-c0x00ffffff-no-rj", subscribers:"24.7M"},
        {
            id:2, title:"Scott Lang Training Montage | Ant-Man | Official Clip", src:"https://www.youtube.com/embed/jRWvpJNovZ0?si=Kwt3WU8ZAMeqSihD", 
            thumbnail:"/assets/youtube/thumbnail2.png", views:"301K", postDate:"1 day", channelName:"Marvel Entertainment", 
            profilePicture:"https://yt3.googleusercontent.com/k7BhK-hm9_MbJbaKznHPhir6e4pWXbm1ppAHoseLIzRgoAPBMmH1IIhYKlXbGono25RD1OQwHQ=s160-c-k-c0x00ffffff-no-rj", subscribers:"21.7M"
        },
        {
            id:3, title:"Happiness", src:"https://www.youtube.com/embed/e9dZQelULDk?si=5_xYYMfcL7f6rlfF", 
            thumbnail:"/assets/youtube/thumbnail3.png", views:"55M", postDate:"7 year", channelName:"Steve Cutts", 
            profilePicture:"https://yt3.googleusercontent.com/ytc/AIdro_miKmb89rERFj1lwkCnn7IY7bazxfNuAApGexoZFNI-v-0=s160-c-k-c0x00ffffff-no-rj", 
            subscribers:"1.97M"
        },

        {
            id:4, title:"Dormammu Time Loop | Doctor Strange | Official Clip", src:"https://www.youtube.com/embed/DCrFkaZL254?si=RC7YN9XA2Lvf28_B", 
            thumbnail:"/assets/youtube/thumbnail4.png", views:"3.4M", postDate:"3 months", channelName:"Marvel Entertainment", 
            profilePicture:"https://yt3.googleusercontent.com/k7BhK-hm9_MbJbaKznHPhir6e4pWXbm1ppAHoseLIzRgoAPBMmH1IIhYKlXbGono25RD1OQwHQ=s160-c-k-c0x00ffffff-no-rj", subscribers:"21.7M"
        },
        {
            id:5, title:"Claude Code is Amazing!", src:"https://www.youtube.com/embed/i3tRkbsE54Q?si=dCklvzbO-rAwIMVH", 
            thumbnail:"/assets/youtube/thumbnail5.png", views:"166K", postDate:"3 weeks", channelName:"CodeWithHarry", 
            profilePicture:"https://yt3.googleusercontent.com/ytc/AIdro_kX3sdbuu3KFmRPsmlu0R5Rx_BhpxwupjtvJmkEdNfla7w=s160-c-k-c0x00ffffff-no-rj", subscribers:"8.75M"
        },
        {
            id:6, title:"Loki Bhaiya | Udit Edits", src:"https://www.youtube.com/embed/mM7gfVYwFuI?si=ERAu_axKBqmKpz4R", 
            thumbnail:"/assets/youtube/thumbnail6.png", views:"315K", postDate:"1 year", channelName:"Udit Edits", 
            profilePicture:"https://yt3.googleusercontent.com/DNGLrro0sbqheMKEgNE3UF7b8IgBO_HysH4YcVMOYIcymZHBb8keTZ-4aa3x7C5z8-n-zJ92=s160-c-k-c0x00ffffff-no-rj", subscribers:"123K"
        },
        {
            id:7, title:"Lord of the Mysteries | Official Trailer 2 | [ENG SUB]", src:"https://www.youtube.com/embed/02jcxBEIWpg?si=OZFTu5kDPtwBwaRC", 
            thumbnail:"/assets/youtube/thumbnail7.png", views:"807K", postDate:"1 year", channelName:"MemozaFusion", 
            profilePicture:"https://yt3.googleusercontent.com/MxxxHmYiH2BHmB1cdoDubP4h1gTikFMVTXRzgBxU6LfvBGX5agT2ajECMTZVCrSRCXTsQdBVFg=s160-c-k-c0x00ffffff-no-rj", subscribers:"73.8K"
        },
        {
            id:8, title:"Infinity Ultron VS The Watcher | What If...? | Official Clip", src:"https://www.youtube.com/embed/0tMMzqWIbcw?si=m5bDsqt5n54aofw9", 
            thumbnail:"/assets/youtube/thumbnail8.png", views:"259K", postDate:"2 weeks", channelName:"Marvel Entertainment", 
            profilePicture:"https://yt3.googleusercontent.com/k7BhK-hm9_MbJbaKznHPhir6e4pWXbm1ppAHoseLIzRgoAPBMmH1IIhYKlXbGono25RD1OQwHQ=s160-c-k-c0x00ffffff-no-rj", subscribers:"21.7M"
        },
        {
            id:9, title:"Afusic - Pal Pal (Official Music Video) Prod.", src:"https://www.youtube.com/embed/8of5w7RgcTc?si=ySS_Xs5d5GJ7-XuV", 
            thumbnail:"/assets/youtube/thumbnail9.png", views:"259K", postDate:"6 months", channelName:"AFUSIC", 
            profilePicture:"https://yt3.googleusercontent.com/BHwT3bbu6tRGHKppQcBf5DY7arDKCijJesyKFSZGQegRPmQaMsg5j25NzIQGRPISvO6Cq2rL=s160-c-k-c0x00ffffff-no-rj", subscribers:"756K"
        },
        // {
        //     id:10, title:"", src:"", 
        //     thumbnail:"", views:"", postDate:"", channelName:"", 
        //     profilePicture:"", subscribers:""
        // },
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
                    <button className="mr-2 cursor-not-allowed"><Menu/></button>
                    <img src="https://cdn-icons-png.flaticon.com/128/5968/5968852.png" alt="youtube logo" className="w-5"/>
                    <span className="text-white text-xl">YouTube</span>
                </div>

                <div className="flex items-center gap-5">
                    <div className="flex items-center rounded-full border border-gray-400">
                        <input type="text" className="p-2 w-90 outline-none" placeholder="Search..."/>
                        <button type="submit" className="py-2 px-3 bg-[#222222] rounded-r-full cursor-not-allowed"><Search/></button>
                    </div>
                    <div className="bg-[#222222] w-10 h-10 flex items-center justify-center rounded-full cursor-not-allowed"><Mic className=""/></div>
                </div>

                <div className="flex items-center gap-5">
                    <div className="flex items-center gap-1 bg-[#222222]  p-2 rounded-full text-sm  cursor-not-allowed"><Plus/><span>Create</span></div>
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

                {section === "Home" && (
                    <>
                    {isPlaying ? (
                    <>
                    <div className="flex-1  flex ">
                        <div className="w-[900px] h-full">
                        <iframe className="w-[100%] h-[500px] rounded-md" frameborder="0"
                        src={play.src} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                        referrerpolicy="strict-origin-when-cross-origin" allowfullscreen>
                        </iframe>
                        <div className="mt-2 w-[100%]">
                            <p className="text-2xl">{play.title}</p>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-5 mt-2">
                                    <img src={play.profilePicture} className="w-8 h-8 rounded-full" alt="" />
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

                        <div className="flex-1 px-2 text-3xl w-[402px] mb-15 bg-[#161616] overflow-y-auto">
                          {videos.map((video)=>(
                            <div className="w-[394px] h-[95px] flex gap-2 my-2 cursor-pointer" onClick={() => playVideo(video)}>
                                <img src={video.thumbnail} alt="" className="w-[168px] rounded-sm"/>
                                <div className="flex flex-col">
                                    <span className="text-[1rem] overflow-hidden">{video.title}</span>
                                    <span className="text-sm text-gray-400">{video.channelName}</span>
                                    <span className="text-sm text-gray-400">{video.views} views • {video.postDate} ago</span>
                                </div>
                            </div>
                          ))}
                        </div>
                    </div>
                    </>
                ):(
                    <>
                        <div className="flex-1 gap-5 mb-17 flex flex-wrap overflow-y-auto">
                        {videos.map((deatils) => (
                        <div className="w-102 cursor-pointer" onClick={() => playVideo(deatils)}>
                            <img src={deatils.thumbnail} className="w-[100%] rounded" alt="" />
                            <div className="flex items-center gap-2 pt-1">
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
                </>
                )}

                {section === "Like" && (
                    <>
                    <div className="flex-1 flex flex-col items-center justify-center">
                        <img className="w-50" src="https://summer.hackclub.com/assets/orpheustimer-3de90461.png" alt="orphus" />
                        <p className="text-5xl my-5">your Liked 💘 videos</p>
                        <span>Developer working on it</span>

                    </div>
                    </>
                )}

                {section === "History" && (
                    <>
                    <div className="flex-1 flex flex-col items-center justify-center">
                        <img className="w-50" src="https://summer.hackclub.com/assets/orpheustimer-3de90461.png" alt="orphus" />
                        <span className="text-5xl">Your ⌚ History</span>
                    </div>
                    </>
                )}

            </div>
        </div>
    )
}