import {  Globe2, Plus, X, LockKeyhole, Search, Globe,  } from "lucide-react"
import { useRef, useState, useEffect } from "react"

export function Browser(){
    const [addressBarValue, setAddressBarValue] = useState("https://www.google.com/search?igu=1");
    const [tabs, setTabs] = useState([
        {
            id:1,
            url: "https://www.google.com/search?igu=1",
            title: "Google",
            isLoading: false,
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
      setTabs((prev) => prev.map((tab) => (tab.id === tabId ? { ...tab, ...updates } : tab)))
    }

    const formatUrl = (input) => {
    if (!input.includes(".") && !input.startsWith("http")) {
      return `https://www.google.com/search?q=${encodeURIComponent(input)}`
    }

    if (!input.startsWith("http://") && !input.startsWith("https://")) {
      return `https://${input}`
    }

    return input
  }

  const navigateToUrl = (url) => {
    const formattedUrl = formatUrl(url)
    const activeTab = getActiveTab()

    if (activeTab) {
      updateTab(activeTab.id, {
        url: formattedUrl,
        isLoading: true,
        title: "Loading...",
      })
    }

    setAddressBarValue(formattedUrl)
  }

  const handleAddressBarSubmit = (e) => {
    e.preventDefault()
    navigateToUrl(addressBarValue)
  }


  const handleIframeLoad = () => {
    const activeTab = getActiveTab()
    if (activeTab) {
      updateTab(activeTab.id, {
        isLoading: false,
        title: getDomain(activeTab.url),
      })
    }
  }

  useEffect(() => {
    const activeTab = getActiveTab()
    if (activeTab) {
      setAddressBarValue(activeTab.url)
    }
  }, [activeTabId, tabs])

  const activeTab = getActiveTab()

    return (
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

      <div className="p-2 bg-gray-50 border-b">

        <form onSubmit={handleAddressBarSubmit} className="flex-1 flex items-center">
          <div className="flex items-center flex-1 bg-white border rounded-full px-3 py-1">
            <div className="hover:bg-gray-400 p-1.5 rounded-full text-center mr-2"><LockKeyhole size={14} className="" /></div>

            <input
              type="text"
              value={addressBarValue}
              onChange={(e) => setAddressBarValue(e.target.value)}
              className="flex-1 outline-none text-sm"
              placeholder="Search or enter web address"
            />

            <button type="submit" className="p-2 hover:bg-gray-300 rounded-full">
              <Search size={14} className="text-blue-500"/>
            </button>
          </div>
        </form>

      </div>

      <div className="flex-1 flex">
        <div className="flex-1 relative">
          {activeTab ? (
            <>
              {activeTab.isLoading && (
                <div className="absolute inset-0 bg-white/80 flex items-center justify-center z-10">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                    <span className="text-sm text-gray-600">Loading...</span>
                  </div>
                </div>
              )}

              <iframe
                ref={iframeRef}
                src={activeTab.url}
                className="w-full h-full border-none"
                onLoad={handleIframeLoad}
                title={`Tab ${activeTab.id}`}
                sandbox="allow-same-origin allow-scripts allow-forms allow-popups"
              />
            </>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500">
              <div className="text-center">
                <Globe size={48} className="mx-auto mb-2 opacity-50" />
                <div>No active tab</div>
              </div>
            </div>
          )}
        </div>
      </div>


    </div>
  )
}
