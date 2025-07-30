import { Globe2, Plus, X } from "lucide-react";
import { useRef, useState } from "react"

export function Browser(){
    const [addressBarValue, setAddressBarValue] = useState("https://www.google.com/search?igu=1");
    const [tabs, setTabs] = useState([
        {
            id:1,
            url: "https://www.google.com/search?igu=1",
            title: "Google",
            isLoadin: false,
        },
    ]);

    const [activeTabId, setActiveTabId] = useState(1);
    const [nextTabId, setNextTabId] = useState(2);
    const iframeRef = useRef(null)

    const getActiveTab = () => {
        return tabs.find((tab) => tab.id === activeTabId)
    }

    const getDomain = (url) => {
        try{
            return new URL(url).hostname;
        }catch{
            return url;
        }
    }

    const createNewTab = (url = "https://www.google.com") => {
        const newTab = {
        id: nextTabId,
        url: url,
        title: "New Tab",
        isLoading: true,
        canGoBack: false,
        canGoForward: false,
        }

        setTabs((prev) => [...prev, newTab])
        setActiveTabId(nextTabId)
        setNextTabId((prev) => prev + 1)
        setAddressBarValue(url)
  }

  const closeTab = (tabId) => {
    if (tabs.length === 1) return

    setTabs((prev) => prev.filter((tab) => tab.id !== tabId))

    if (tabId === activeTabId) {
      const remainingTabs = tabs.filter((tab) => tab.id !== tabId)
      if (remainingTabs.length > 0) {
        setActiveTabId(remainingTabs[0].id)
        setAddressBarValue(remainingTabs[0].url)
      }
    }
  }
    
    const switchTab = (tabId) => {
        setActiveTabId(tabId)
        const tab = tabs.find((t) => t.id === tabId)
        if (tab) {
        setAddressBarValue(tab.url)
    }
  }
    
    const updateTab = (tabId, updates) => {
        setTabs((prev) => prev.map((tab) => (tab.id === tabId ? { ... prev, ...updates} : tab)))
    }

    const handleIframeLoad = () => {
        const activeTab = getActiveTab()
        if(activeTab){
            updateTab(activeTab.id, {
                isLoadin:false,
                title: getDomain(activeTab.url),
            })
        }
    }
    
    return(
        <div className="w-full h-full flex flex-col bg-white">
            <div className="flex items-center bg-gray-100 border-b">
        <div className="flex items-center flex-1 overflow-x-auto">
          {tabs.map((tab) => (
            <div
              key={tab.id}
              className={`
                flex items-center gap-2 px-3 py-2 border-r cursor-pointer min-w-0 max-w-48
                ${tab.id === activeTabId ? "bg-white border-b-2 border-blue-500" : "hover:bg-gray-200"}
              `}
              onClick={() => switchTab(tab.id)}
            >

              {tab.isLoading ? (
                <div className="w-3 h-3 border border-blue-500 border-t-transparent rounded-full animate-spin" />
              ) : (
                <Globe2 size={12} className="text-gray-500 flex-shrink-0" />
              )}

              <span className="text-sm truncate flex-1">{tab.title}</span>

              {tabs.length > 1 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    closeTab(tab.id)
                  }}
                  className="p-1 hover:bg-gray-300 rounded"
                >
                  <X size={10} />
                </button>
              )}
            </div>
          ))}

          <button onClick={() => createNewTab()} className="p-2 hover:bg-gray-200 border-r" title="New Tab">
            <Plus size={14} />
          </button>
        </div>
      </div>


            <form className="bg-red-400 flex-1 flex items-center">
                <div className="flex items-center flex-1 bg-white border  rounded-full px-3 py-1">
                    <input type="text" 
                        value={addressBarValue} 
                        onChange={(e) => setAddressBarValue(e.target.value)} 
                        className="border"
                    />

                    <button type="submit" className="p-1 hover:bg-gray-100 rounded">
                        🔍
                    </button>
                </div>
            </form>

            <div className="bg-amber-300 w-full h-full">
                <iframe 
                    ref={iframeRef}
                    src={addressBarValue}
                    onLoad={handleIframeLoad}
                    className="w-full h-full"
                    frameBorder="0">Content</iframe>
            </div>
        </div>
    )
}