"use client"

import { ArrowLeft, File, FileText, Folder, FolderPlus, Home, ImageIcon, Music, Search, Trash2, Upload, Video } from "lucide-react";
import { useEffect, useState } from "react";

export function FileExplorer(){
  const [currentPath, setCurrentPath] = useState('/');
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);

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

  const filteredItems = () => {
    const items = getCurrentDirectory()
    if (!searchQuery) return items 

    const filtered = {}
    Object.entries(items).forEach(([name, item]) => {
      if (name.toLowerCase().includes(searchQuery.toLowerCase())) {
        filtered[name] = item
      }
    })
    return filtered
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
          <span className="text-sm text-gray-600">Home/</span>
        </div>

        <div className="relative">
          <Search size={16} className="absolute left-2 top-1/2 transform -translate-y-1/2 text-blue-500"/>
          <input type="text" placeholder="Search..."
            className="border pl-7 pr-2 py-1 text-sm rounded focus:outline-none focus:ring-1" />
        </div>

      <button className="p-1 rounded hover:bg-gray-400" title="Upload Files">
        <Upload size={18}/>
      </button>

      <button className="p-1 rounded hover:bg-gray-400" title="Add Folder">
        <FolderPlus size={18}/>
      </button>
      <button className="p-1 rounded hover:bg-gray-400" title="Add File">
        <File size={18}/>
      </button>

      <button className="p-1 rounded hover:bg-red-300" title="Delete">
        <Trash2 size={18}/>
      </button>
      </div>


      {/* Upload file section */}

      <div className="flex-1 overflow-auto">
        {/* Search folder/files items  */}

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
                  navigateToFile(name);
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
      </div>

    </div>
  )
}