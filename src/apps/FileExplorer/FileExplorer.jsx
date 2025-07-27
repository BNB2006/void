"use client"

import { ArrowLeft, File, FileText, Folder, FolderPlus, Home, ImageIcon, Music, Search, Trash2, Upload, Video } from "lucide-react";
import { useEffect, useState } from "react";

export function FileExplorer(){
  const [currentPath, setCurrentPath] = useState('/');
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);

  const [showCreateFolder, setShowCreateFolder] = useState(false)
  const [showCreateFile, setShowCreateFile] = useState(false)
  const [newItemName, setNewItemName] = useState("")

  const [fileSystem, setFileSystem] = useState({
    '/':{
      type: "folder",
      name: "Root",
      children: {
        Images:{
          type:"folder",
          name: "Images",
          children:{
            "nature.jpeg":{
              type: "file",
              name: "nature.jpeg",
              size: "2.5 MB",
              modified: "2024-01-15",
              URL: "https://images.pexels.com/photos/1172675/pexels-photo-1172675.jpeg",
              fileType: "image",
            },
          },
        },
        Music: {
          type: "folder",
          name: "Music",
          children: {
            "demo-song.mp3": {
              type: "file",
              name: "demo-song.mp3",
              size: "4.2 MB",
              modified: "2024-01-12",
              url: "data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmGgU7k9n1unEiBC13yO/eizEIHWq+8+OWT",
              fileType: "audio",
            },
            "background-music.wav": {
              type: "file",
              name: "background-music.wav",
              size: "8.1 MB",
              modified: "2024-01-14",
              url: "data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmGgU7k9n1unEiBC13yO/eizEIHWq+8+OWT",
              fileType: "audio",
            },
          },
        },
        Videos: {
          type: "folder",
          name: "Videos",
          children: {
            "sample-video.mp4": {
              type: "file",
              name: "sample-video.mp4",
              size: "15.2 MB",
              modified: "2024-01-08",
              url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
              fileType: "video",
            },
            "tutorial.webm": {
              type: "file",
              name: "tutorial.webm",
              size: "8.7 MB",
              modified: "2024-01-16",
              url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
              fileType: "video",
            },
          },
        },
        Documents: {
          type: "folder",
          name: "Documents",
          children: {
            "readme.txt": {
              type: "file",
              name: "readme.txt",
              size: "1 KB",
              modified: "2024-01-16",
              content:
                "Welcome to the File Explorer!\n\nThis is a sample text file.\nYou can create, edit, and manage files here.\n\nFeatures:\n- Create folders and files\n- Upload real files\n- Preview images and videos\n- Search functionality\n- File management",
              fileType: "text",
            },
            "notes.md": {
              type: "file",
              name: "notes.md",
              size: "2.1 KB",
              modified: "2024-01-19",
              content:
                "# My Notes\n\n## Todo List\n- [x] Create file explorer\n- [x] Add file upload\n- [ ] Add file editing\n- [ ] Add file sharing\n\n## Ideas\n- Implement drag and drop\n- Add file compression\n- Create file search indexing",
              fileType: "text",
            },
          },
        },
        Notes: {
          type: "folder",
          name: "Notes",
          children:{},
        }
      },
    },
  });

  const getCurrentDirectory = () => {
    const pathParts = currentPath.split("/").filter(Boolean)
    let current = fileSystem["/"]

    
    for (const part of pathParts) {
      if (current.children && current.children[part]) {
        current = current.children[part]
      }
    }

    return current.children || {}
  }

  const getIcon = (item) => {
    if (item.type === "folder") {
      return <Folder className="h-4 w-4 text-blue-500" />
    }

    const extension = item.name.split(".").pop()?.toLowerCase()
    switch (extension) {
      case "jpg":
      case "jpeg":
      case "png":
      case "gif":
      case "webp":
        return <ImageIcon className="h-4 w-4 text-green-500" />
      case "mp3":
      case "wav":
      case "flac":
      case "ogg":
        return <Music className="h-4 w-4 text-purple-500" />
      case "mp4":
      case "avi":
      case "mkv":
      case "webm":
        return <Video className="h-4 w-4 text-red-500" /> 
      case "txt":
      case "md":
      case "json":
        return <FileText className="h-4 w-4 text-gray-500" />
      default:
        return <File className="h-4 w-4 text-gray-500" /> 
    }
  }

  const navigateToFolder = (folderName) => {
    if (folderName === "..") {
      const pathParts = currentPath.split("/").filter(Boolean)
      pathParts.pop()
      setCurrentPath(pathParts.length > 0 ? "/" + pathParts.join("/") : "/")
    } else {
      const newPath = currentPath === "/" ? `/${folderName}` : `${currentPath}/${folderName}`
      setCurrentPath(newPath)
    }
    setSelectedItems([])
  }

  const goBack = () => {
    navigateToFolder("..")
  }

  const goHome = () => {
    setCurrentPath('/');
    setSelectedItems([]);
  }

  const createFolder = () => {
    if (!newItemName.trim()) return

    setFileSystem((prev) => {
      const newFS = { ...prev }
      const pathParts = currentPath.split("/").filter(Boolean)
      let current = newFS["/"]

      for (const part of pathParts) {
        if (current.children && current.children[part]) {
          current = current.children[part]
        }
      }

      if (!current.children) current.children = {}
      current.children[newItemName] = {
        type: "folder",
        name: newItemName,
        children: {},
      }

      return newFS
    })

    setNewItemName("")
    setShowCreateFolder(false)
  }

  const createFile = () => {
    if(!newItemName.trim()) return;
    
    setFileSystem((prev) => {
      const newFS = { ...prev }
      const pathParts = currentPath.split("/").filter(Boolean)
      let current = newFS["/"]

      for(const part of pathParts){
        if(current.children && current.children[part]){
          current = current.children[part];
        }
      }

      if(!current.children) current.children = {}
      current.children[newItemName] = {
        type: "file",
        name: newItemName,
        size: "0 KB",
        modified: new Date().toISOString().split("T")[0],
        content: "",
        fileType: "text",
      }

      return newFS
    })

    setShowCreateFile(false);
    setNewItemName("");
  }

  const filteredItems = () => {
    const items = getCurrentDirectory()
    if (!searchQuery) return items 

      const filtered = {}
      Object.entries(items).forEach(([name, item]) => {
        if(name.toLowerCase().includes(searchQuery.toLowerCase())){
          filtered[name] = item;
        }
      })
    return filtered;
  }

  const getBreadcrumbs = () => {
    if( currentPath === "/") return ["Home"];
    const parts = currentPath.split("/").filter(Boolean);
    return ["Home", ...parts]
  }



  const currentItems = filteredItems()

  return(
    <div className="w-full h-full flex flex-col bg-blue-100">
      
      <div className="flex items-center gap-2 p-2 border-b bg-blue-200">
        <button
        onClick={goBack}
          disabled={currentPath==="/"}
          className="p-1 rounded hover:bg-gray-400 disabled:opacity-50 disabled:cursor-not-allowed" 
          title="Go Back">
          <ArrowLeft size={18}/>
        </button>
        <button onClick={goHome} className="p-1 rounded hover:bg-gray-400" title="Go Home">
          <Home size={18}/>
        </button>
        
        <div className="flex items-center gap-1 flex-1">
          {getBreadcrumbs().map((crumb, index) => (
            <span key={index} className="text-sm text-gray-600">
              {index > 0 && "/"}
              {crumb}
            </span>
          ))}
        </div>

        <div className="relative">
          <Search size={16} className="absolute left-2 top-1/2 transform -translate-y-1/2 text-blue-500"/>
          <input type="text" placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border pl-7 pr-2 py-1 text-sm rounded focus:outline-none focus:ring-1" />
        </div>

      <button className="p-1 rounded hover:bg-gray-400" title="Upload Files">
        <Upload size={18}/>
      </button>

      <button onClick={() => setShowCreateFolder(true)} className="p-1 rounded hover:bg-gray-400" title="Add Folder">
        <FolderPlus size={18}/>
      </button>
      <button onClick={() => setShowCreateFile(true)} className="p-1 rounded hover:bg-gray-400" title="Add File">
        <File size={18}/>
      </button>

      <button className="p-1 rounded hover:bg-red-300" title="Delete">
        <Trash2 size={18}/>
      </button>
      </div>


      {/* Upload file section */}

      <div className="flex-1 overflow-auto">
        {Object.keys(currentItems).length === 0 ? (
          <div className="flex items-center justify-center h-full text-red-400">
            {searchQuery ? "No items match your search" : "This folder is empty"}
          </div>
        ) : (

        <div className="grid grid-cols-1 p-2">
          {Object.entries(currentItems). map(([name, item]) => (
            <div
              key={name}
              className={`
                flex items-center gap-3 p-2 rounded cursor-pointer hover:bg-blue-200
                ${selectedItems.includes(name) ? "bg-blue-600" : ""}
              `}
              // onClick={() => toggleSelection(name)}
              onDoubleClick={() => {
                if(item.type === "folder"){
                  navigateToFolder(name);
                }else{
                  // navigateToFile(name);
                }
              }}
            >
              {getIcon(item)}

              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium truncate">{name}</div>
                {item.type === "file" && (
                  <div className="text-xs text-gray-500">
                    {item.size} • Modified {item.modified}
                    {item.realFile && <span className="ml-2 text-green-600">• Uploaded</span>}
                  </div>
                )}
              </div>


            </div>
          ))}
        </div>
        )}
      </div>


      {/* Create Folder  */}
      {showCreateFolder && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-blue-200 p-4 rounded-lg shadow-lg w-80">
            <h3 className="text-lg font-medium mb-3">Create New Folder</h3>
            <input
              type="text"
              placeholder="Folder name"
              value={newItemName}
              onChange={(e) => setNewItemName(e.target.value)}
              className="w-full p-2 border rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
              onKeyPress={(e) => e.key === "Enter" && createFolder()}
              autoFocus
            />
            <div className="flex gap-2 mt-4">
              <button
                onClick={createFolder}
                disabled={!newItemName.trim()}
                className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
              >
                Create
              </button>
              <button
                onClick={() => {
                  setShowCreateFolder(false)
                  setNewItemName("")
                }}
                className="px-3 py-1 border rounded bg-white hover:bg-blue-300"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Create File  */}
      {showCreateFile && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-blue-200 p-4 rounded-lg shadow-lg w-80">
            <h3 className="text-lg font-medium mb-3">Create New File</h3>
            <input
              type="text"
              placeholder="Folder name"
              value={newItemName}
              onChange={(e) => setNewItemName(e.target.value)}
              className="w-full p-2 border rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
              onKeyPress={(e) => e.key === "Enter" && createFile()}
              autoFocus
            />
            <div className="flex gap-2 mt-4">
              <button
                onClick={createFile}
                disabled={!newItemName.trim()}
                className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
              >
                Create
              </button>
              <button
                onClick={() => {
                  setShowCreateFile(false)
                  setNewItemName("")
                }}
                className="px-3 py-1 border rounded bg-white hover:bg-blue-300"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}