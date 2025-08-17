import { Cpu, Gpu, MemoryStick, Microchip, Signal, Wifi, WifiIcon } from "lucide-react";
import { useEffect, useState } from "react"
import { Line, LineChart, ResponsiveContainer, YAxis } from "recharts";

export function TaskManager(){
    const [option, setOption] = useState("GPU")
    const [cpuData, setCpuData] = useState([])
    const [memoryData, setMemoryData] = useState([])
    const [diskData, setDiskData] = useState([])
    const [wifiData, setWifiData] = useState([])
    const [gpuData, setGpuData] = useState({
        gpu3D: [],
        copy: [],
        videoDecode: [],
        videoProcessing: [],
        shared: [],
        dedicated: []
    })

    useEffect(() => {
        const generateInitialData = (baseValue, variance = 10, points = 60) => {
            return Array.from({ length: points }, (_, i) => ({
                time: i,
                value: Math.max(0, Math.min(100, baseValue + (Math.random() - 0.5) * variance))
            }))
        }

        setCpuData(generateInitialData(27, 15))
        setMemoryData(generateInitialData(56, 5))
        setDiskData(generateInitialData(27, 20))
        setWifiData(generateInitialData(35, 25))
        setGpuData({
            gpu3D: generateInitialData(8, 12),
            copy: generateInitialData(2, 3),
            videoDecode: generateInitialData(5, 8),
            videoProcessing: generateInitialData(1, 2),
            shared: generateInitialData(15, 8),
            dedicated: generateInitialData(12, 6)
        })
    }, [])

    useEffect(() => {
        const interval = setInterval(() => {
            const updateData = (prevData, baseValue, variance) => {
                const newData = [...prevData.slice(1)]
                const lastValue = prevData[prevData.length - 1]?.value || baseValue
                const change = (Math.random() - 0.5) * variance
                const newValue = Math.max(0, Math.min(100, lastValue + change))
                newData.push({
                    time: Date.now(),
                    value: newValue
                })
                return newData
            }

            setCpuData(prev => updateData(prev, 27, 8))
            setMemoryData(prev => updateData(prev, 56, 3))
            setDiskData(prev => updateData(prev, 27, 12))
            setWifiData(prev => updateData(prev, 35, 15))
            setGpuData(prev => ({
                gpu3D: updateData(prev.gpu3D, 8, 6),
                copy: updateData(prev.copy, 2, 2),
                videoDecode: updateData(prev.videoDecode, 5, 4),
                videoProcessing: updateData(prev.videoProcessing, 1, 1),
                shared: updateData(prev.shared, 15, 5),
                dedicated: updateData(prev.dedicated, 12, 4)
            }))
        }, 1000)

        return () => clearInterval(interval)
    }, [])

    const GraphComponent = ({ data, color = "#00ff00", height = "100%" }) => (
        <ResponsiveContainer width="100%" height={height}>
            <LineChart data={data} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                <YAxis domain={[0, 100]} hide />
                <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke={color} 
                    strokeWidth={1}
                    dot={false}
                    isAnimationActive={false}
                />
            </LineChart>
        </ResponsiveContainer>
    )

    const getCurrentValue = (data) => {
        return data.length > 0 ? Math.round(data[data.length - 1].value) : 0
    }


    return(
        <div className="bg-[#191919] text-white">
          <div className="overflow-y-hidden">
            <div className="border-b border-gray-600 p-2">Performance</div>
            <div className="flex">
                <div className="w-[15%] p-2">
                    <div onClick={() => setOption("CPU")} className="flex items-center gap-2 cursor-pointer hover:bg-black/20">
                        <Cpu size={24} className="ml-2 text-red-500"/>
                        <div className="p-2">
                            <p className="text-2xl">CPU</p>
                            <p className="text-xs">{getCurrentValue(cpuData)}% 3.28GHz</p>
                        </div>
                    </div>
                    <div onClick={() => setOption("Memory")} className="flex items-center gap-2 cursor-pointer hover:bg-black/20">
                        <MemoryStick size={24} className="ml-2 text-purple-500"/>
                        <div className="p-2">
                            <p>Memory</p>
                        <p className="text-xs">8/128 GB {getCurrentValue(memoryData)}%</p>
                        </div>
                    </div>
                    <div onClick={() => setOption("Disk")} className="flex items-center gap-2 cursor-pointer hover:bg-black/20">
                        <Microchip size={24} className="ml-2 text-yellow-500"/>
                        <div className="p-2">
                            <p>Disk</p>
                            <p className="text-xs">SSD {getCurrentValue(diskData)}%</p>
                        </div>
                    </div>
                    <div onClick={() => setOption("Wi-Fi")} className="flex items-center gap-2 cursor-pointer hover:bg-black/20">
                        <WifiIcon size={24} className="ml-2 text-blue-500"/>
                        <div className="p-2">
                            <p>Wi-Fi</p>
                            <p className="text-xs">wi-fi 5.5 Mbps</p>
                        </div>
                    </div>
                    <div onClick={() => setOption("GPU")} className="flex items-center gap-2 cursor-pointer hover:bg-black/20">
                        <Gpu size={24} className="ml-2 text-green-500"/>
                        <div className="p-2">
                            <p>GPU</p>
                            <p className="text-xs">NVIDIA GeForce RTX 7050</p>
                            <span className="text-xs">{getCurrentValue(gpuData)}% (39 °C)</span>
                        </div>
                    </div>
                </div>

                <div className="flex-1 flex flex-col p-4">
                    {option === "CPU" && (
                    <>
                    <div>
                        <div className="text-xl flex items-center justify-between">
                        <p>CPU</p>
                        <p>15th Gen Intel(R) Core(TM) i9-99990 @3.20GHz</p>
                    </div>
                    <div className="flex items-center justify-between text-xs mt-1">
                        <p>% Utilization</p>
                        <p>{getCurrentValue(cpuData)}%</p>
                    </div>
                    <div className="h-60 pt-4  border [background-image:repeating-linear-gradient(0deg,rgba(255,255,255,0.05)_0px,rgba(255,255,255,0.05)_1px,transparent_1px,transparent_32px),repeating-linear-gradient(90deg,rgba(255,255,255,0.05)_0px,rgba(255,255,255,0.05)_1px,transparent_1px,transparent_32px)]">
                        <GraphComponent data={cpuData} color="#ff0d00" />   
                    </div>
                    <div className="flex items-center justify-between text-gray-400 text-xs">
                        <p>60 seconds</p>
                        <p>0</p>
                    </div>

                    <div className="flex gap-5 mt-4">
                        <div className="">

                            <div className="flex gap-5">
                                <div>
                                    <p className="text-gray-500 text-sm">Utilization</p>
                                    <p>27%</p>
                                </div>
                                <div>
                                    <p className="text-gray-500 text-sm">Speed</p>
                                    <p>3.28 GHz</p>
                                </div>
                            </div>

                            <div className="flex gap-5">
                                <div>
                                    <p className="text-gray-500 text-sm">Processes</p>
                                    <p>311</p>
                                </div>
                                <div>
                                    <p className="text-gray-500 text-sm">Threads</p>
                                    <p>4785</p>
                                </div>
                                <div>
                                    <p className="text-gray-500 text-sm">Handles</p>
                                    <p>173463</p>
                                </div>
                            </div>
                            <div>
                                <p className="text-gray-500 text-sm">Up time</p>
                                <p>15:07:53:22</p>
                            </div>
                        </div>

                        <div className=" w-50 flex justify-between">
                            <div className="text-gray-500 text-sm">
                                <p>Base speed</p>
                                <p>Sockets:</p>
                                <p>Cores:</p>
                                <p>Logical processors</p>
                                <p>Virtualization:</p>
                                <p>L1 cache:</p>
                                <p>L1 cache:</p>
                                <p>L1 cache:</p>
                            </div>
                            <div className="text-sm">
                                <p>3.19 GHz</p>
                                <p>1</p>
                                <p>4</p>
                                <p>8</p>
                                <p>Enabled</p>
                                <p>320 KB</p>
                                <p>5.0 MB</p>
                                <p>8.0 MB</p>
                            </div>
                        </div>
                    </div>
                    </div>
                    </>
                    )}

                    {option === "Memory" && (
                    <>
                    <div>
                        <div className="text-xl flex items-center justify-between">
                        <p>Memory</p>
                        <p>128.0 GB</p>
                    </div>
                    <div className="flex items-center justify-between text-xs text-gray-500 mt-1">
                        <p>Memory usage</p>
                        <p>{getCurrentValue(memoryData)}%</p>
                    </div>
                    <div className="h-60 pt-4 border [background-image:repeating-linear-gradient(0deg,rgba(255,255,255,0.05)_0px,rgba(255,255,255,0.05)_1px,transparent_1px,transparent_32px),repeating-linear-gradient(90deg,rgba(255,255,255,0.05)_0px,rgba(255,255,255,0.05)_1px,transparent_1px,transparent_32px)]">
                        <GraphComponent data={memoryData} color="#9d4edd" />   
                    </div>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                        <p>60 seconds</p>
                        <p>0</p>
                    </div>
                    <div className="flex gap-5 mt-4">
                        <div>
                            <div className="flex gap-5 mt-1">
                                <div>
                                    <p className="text-gray-500 text-sm">In use (Compressed)</p>
                                    <p>128 GB (24 GB)</p>
                                </div>
                                <div>
                                    <p className="text-gray-500 text-sm">Available</p>
                                    <p>625 MB</p>
                                </div>
                            </div>
                            <div className="flex gap-5 mt-1">
                                <div>
                                    <p className="text-gray-500 text-sm">Committed</p>
                                    <p>16.3/19.4 GB</p>
                                </div>
                                <div>
                                    <p className="text-gray-500 text-sm">Cached</p>
                                    <p>611 MB</p>
                                </div>
                            </div>
                            <div className="flex gap-5 mt-1">
                                <div>
                                    <p className="text-gray-500 text-sm">Paged pool</p>
                                    <p>944 MB</p>
                                </div>
                                <div>
                                    <p className="text-gray-500 text-sm">Noon-paged pool</p>
                                    <p>992 MB</p>
                                </div>
                            </div>
                        </div>
                        <div className=" w-50 flex justify-between mt-1">
                            <div className="text-gray-500 text-sm">
                                <p>Speed</p>
                                <p>Slots used:</p>
                                <p>Form factor:</p>
                                <p>Hardware reserved:</p>
                            </div>
                            <div className="text-sm">
                                <p>3200 MT/s</p>
                                <p>1 of 1</p>
                                <p>SODIMM</p>
                                <p>217 MB</p>
                            </div>
                        </div>
                    </div>
                    </div>
                    </>
                    )}

                    {option === "Disk" && (
                    <>
                    <div>
                    <div className="text-xl flex items-center justify-between">
                        <p>Disk 0 (C: D)</p>
                        <p>NVMe SOLIDIHM SSDPFINX512GLZ</p>
                    </div>
                    <div className="flex items-center justify-between text-xs text-gray-500 mt-1">
                        <p>Active time</p>
                        <p>{getCurrentValue(diskData)}%</p>
                    </div>
                    <div className="h-60 pt-4 border [background-image:repeating-linear-gradient(0deg,rgba(255,255,255,0.05)_0px,rgba(255,255,255,0.05)_1px,transparent_1px,transparent_32px),repeating-linear-gradient(90deg,rgba(255,255,255,0.05)_0px,rgba(255,255,255,0.05)_1px,transparent_1px,transparent_32px)]">
                        <GraphComponent data={diskData} color="#ffd60a" />   
                    </div>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                        <p>60 seconds</p>
                        <p>0</p>
                    </div>
                    <div className="flex gap-5 mt-4">
                        <div>
                            <div className="flex gap-5 mt-1">
                                <div>
                                    <p className="text-gray-500 text-sm">Active time</p>
                                    <p>4%</p>
                                </div>
                                <div>
                                    <p className="text-gray-500 text-sm">Average response time</p>
                                    <p>0.2 ms</p>
                                </div>
                            </div>
                            <div className="flex gap-5 mt-1">
                                <div className="border-l border-green-500 pl-2">
                                    <p className="text-gray-500 text-sm">Read speed</p>
                                    <p>3.8 KB/s</p>
                                </div>
                                <div className="border-l border-green-500 border-dashed pl-2">
                                    <p className="text-gray-500 text-sm">Write speed</p>
                                    <p>210 KB/s</p>
                                </div>
                            </div>
                        </div>
                        <div className=" w-50 flex justify-between mt-1">
                            <div className="text-gray-500 text-sm">
                                <p>Capacity:</p>
                                <p>Formatted:</p>
                                <p>System disk:</p>
                                <p>Page file:</p>
                                <p>Type:</p>
                            </div>
                            <div className="text-sm">
                                <p>512 TB</p>
                                <p>512 TB</p>
                                <p>Yes</p>
                                <p>Yes</p>
                                <p>SSD (RAID)</p>
                            </div>
                        </div>
                    </div>
                    </div>
                    </>
                    )}

                    {option === "Wi-Fi" && (
                    <>
                    <div>
                    <div className="text-xl flex items-center justify-between">
                        <p>Wi-Fi</p>
                        <p>Intel(R) Wi-Fi AX201 160MHZ</p>
                    </div>
                    <div className="flex items-center justify-between text-xs text-gray-500 mt-1">
                        <p>Throughtput</p>
                        <p>{getCurrentValue(wifiData)}%</p>
                    </div>
                    <div className="h-60 p-t4 border [background-image:repeating-linear-gradient(0deg,rgba(255,255,255,0.05)_0px,rgba(255,255,255,0.05)_1px,transparent_1px,transparent_32px),repeating-linear-gradient(90deg,rgba(255,255,255,0.05)_0px,rgba(255,255,255,0.05)_1px,transparent_1px,transparent_32px)]">
                        <GraphComponent data={wifiData} color="#0077b6" />   
                    </div>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                        <p>60 seconds</p>
                        <p>0</p>
                    </div>
                    <div className="flex gap-10 mt-4">
                        <div className="mt-1 flex flex-col gap-5">
                            <div className="border-l border-pink-500 border-dashed pl-2">
                                <p className="text-gray-500 text-sm">send</p>
                                <p>0 Kbps</p>
                            </div>
                            <div className="border-l border-pink-500 pl-2">
                                <p className="text-gray-500 text-sm">Receive</p>
                                <p>0 Kbps</p>
                            </div>
                        </div>
                        <div className="flex gap-4 mt-1">
                            <div className="text-gray-500 text-sm">
                                <p>Adapter name:</p>
                                <p>SSID:</p>
                                <p>Connection type:</p>
                                <p>IPv4 address:</p>
                                <p>IPv6 address:</p>
                                <p>Signal strength:</p>
                            </div>
                            <div className="text-sm">
                                <p>Wi-Fi</p>
                                <p>Void</p>
                                <p>802.11n</p>
                                <p>13.157.25.49</p>
                                <p>2025:50c2:484d:ac30:ef6a:2462:8d84:4d6f</p>
                                <p><Signal size={20} className="text-pink-500"/></p>
                            </div>
                        </div>
                    </div>
                    </div>
                    </>
                    )}


                    {option === "GPU" && (
                        <>
                        <div>
                            <div className="flex justify-between">
                                <p>GPU</p>
                                <p>NAVIDIA GeForce RTX 7050</p>
                            </div>
                            <div className="grid grid-cols-2 gap-4 mb-2">
                                <div>
                                    <div className="flex justify-between">
                                        <p className="text-xs text-gray-500">3D</p>
                                        <p className="text-xs text-gray-500">{getCurrentValue(gpuData.gpu3D)}%</p>
                                    </div>
                                    <div className="h-28 pt-4 border [background-image:repeating-linear-gradient(0deg,rgba(255,255,255,0.05)_0px,rgba(255,255,255,0.05)_1px,transparent_1px,transparent_26px),repeating-linear-gradient(90deg,rgba(255,255,255,0.05)_0px,rgba(255,255,255,0.05)_1px,transparent_1px,transparent_28px)]">
                                        <GraphComponent data={gpuData.gpu3D} color="#ff6b35" height="100%" />
                                    
                                    </div>
                                </div>
                                
                                <div>
                                    <div className="flex justify-between">
                                        <p className="text-xs text-gray-500">Copy</p>
                                    <p className="text-xs text-gray-500">{getCurrentValue(gpuData.copy)}%</p>
                                    </div>
                                    <div className="h-28 pt-4 border [background-image:repeating-linear-gradient(0deg,rgba(255,255,255,0.05)_0px,rgba(255,255,255,0.05)_1px,transparent_1px,transparent_26px),repeating-linear-gradient(90deg,rgba(255,255,255,0.05)_0px,rgba(255,255,255,0.05)_1px,transparent_1px,transparent_28px)]">
                                        <GraphComponent data={gpuData.copy} color="#00f5ff" height="100%" />
                                </div>
                                </div>
                                
                                <div>
                                    <div className="flex justify-between">
                                        <p className="text-xs text-gray-500">Video Decode</p>
                                    <p className="text-xs text-gray-500">{getCurrentValue(gpuData.videoDecode)}%</p>
                                    </div>
                                    <div className="h-28 pt-4 border [background-image:repeating-linear-gradient(0deg,rgba(255,255,255,0.05)_0px,rgba(255,255,255,0.05)_1px,transparent_1px,transparent_26px),repeating-linear-gradient(90deg,rgba(255,255,255,0.05)_0px,rgba(255,255,255,0.05)_1px,transparent_1px,transparent_28px)]">
                                        <GraphComponent data={gpuData.videoDecode} color="#7209b7" height="100%" />
                                </div>
                                </div>
                                
                                <div>
                                    <div className="flex justify-between">
                                        <p className="text-xs text-gray-500">Video Processing</p>
                                    <p className="text-xs text-gray-500">{getCurrentValue(gpuData.videoProcessing)}%</p>
                                    </div>
                                    <div className="h-28 pt-4 border [background-image:repeating-linear-gradient(0deg,rgba(255,255,255,0.05)_0px,rgba(255,255,255,0.05)_1px,transparent_1px,transparent_26px),repeating-linear-gradient(90deg,rgba(255,255,255,0.05)_0px,rgba(255,255,255,0.05)_1px,transparent_1px,transparent_28px)]">
                                        <GraphComponent data={gpuData.videoProcessing} color="#ff1744" height="100%" />
                                </div>
                                </div>
                            </div>

                            <div>
                                <div className="flex justify-between">
                                    <p className="text-xs text-gray-500">Shared GPU memory usage</p>
                                <p className="text-xs text-gray-500">{getCurrentValue(gpuData.shared)}%</p>
                                </div>
                                <div className="h-10 pt-4 border [background-image:repeating-linear-gradient(0deg,rgba(255,255,255,0.05)_0px,rgba(255,255,255,0.05)_1px,transparent_1px,transparent_12px),repeating-linear-gradient(90deg,rgba(255,255,255,0.05)_0px,rgba(255,255,255,0.05)_1px,transparent_1px,transparent_14px)]">
                                    <GraphComponent data={gpuData.shared} color="#00c851" height="100%" />
                            </div>
                            </div>

                            <div className="flex gap-5 mt-4">
                                <div className="text-lg">
                                    <div>
                                        <p className="text-gray-500 text-sm">Utilization</p>
                                        <p>10%</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-500 text-sm">Gpu Memory</p>
                                        <p>3.9/7.9 GB</p>
                                    </div>
                                </div>
                                <div className="text-sm">
                                    <div>
                                        <p className="text-gray-500 text-sm">Dedicated GPU memory</p>
                                        <p>0.0/4.0 GB</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-500 text-sm">Shared GPU memory</p>
                                        <p>0.0/3.9 GB</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-500 text-sm">Temperature</p>
                                        <p>39 °C</p>
                                    </div>
                                </div>
                                <div className="flex gap-4 mt-1">
                            <div className="text-gray-500 text-sm">
                                <p>Driver version:</p>
                                <p>Driver date:</p>
                                <p>DirectX version:</p>
                                <p>Physical location:</p>
                                <p>Hardware reserved memory:</p>
                            </div>
                            <div className="text-sm">
                                <p>32.0.43.7258</p>
                                <p>25-04-2025</p>
                                <p>15 (Fl 15.1)</p>
                                <p>PCI bus 1, device 0, function 0</p>
                                <p>131 MB</p>
                            </div>
                        </div>
                            </div>
                        </div>
                        </>
                    )}
                </div>
            </div>
            </div>
        </div>
    )
}