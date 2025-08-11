import { ArrowLeft, CameraIcon, Trash2, X } from "lucide-react";
import { useRef, useState } from "react";
import Webcam from "react-webcam";

export function Camera(){
  const webcamRef = useRef(null);
  const [images, setImages] = useState([]);
  const [showGallery, setShowGallery] = useState(false);

  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImages((prev) => [...prev, imageSrc]);
  };

  const deleteImage = (index) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  if (showGallery) {
    return (
      <div className="h-full bg-black text-white flex flex-col">
        <div className="flex items-center justify-between p-4 bg-black/80">
          <button 
            onClick={() => setShowGallery(false)}
            className="flex items-center gap-2 text-white hover:text-gray-300"
          >
            <ArrowLeft size={24} />
            <span>Back</span>
          </button>
          <h1 className="text-lg font-medium">Photos ({images.length})</h1>
          <div></div>
        </div>

        <div className="flex-1 p-4 overflow-y-auto">
          {images.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center text-gray-400">
                <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gray-700 flex items-center justify-center text-4xl">
                  📷
                </div>
                <p>No photos yet</p>
                <p className="text-sm mt-2">Start taking photos to see them here</p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {images.map((image, index) => (
                <div key={index} className="relative group">
                  <img 
                    src={image} 
                    alt={`Captured ${index + 1}`}
                    className="w-full aspect-square object-cover rounded-lg"
                  />
                  <button
                    onClick={() => deleteImage(index)}
                    className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="h-full  overflow-hidden flex bg-black">
      <div className="h-[100%] w-full">
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          className="w-full h-[100%] object-cover  rounded-xl py-2 pl-2"
          videoConstraints={{
            width:1280,
            height: 720,
            facingMode: "user"
          }}
        />
      </div>

      <div className="py-2 px-1 flex flex-col justify-between ">
        <div></div>
        <div>
          <button onClick={capture}
            className="w-15 h-15  bg-gray-400 text-white rounded-full border-2 border-white/70 flex items-center justify-center"
          >
           <CameraIcon/>
          </button>
        </div>

        <div className="pb-5">
          <button
              onClick={() => setShowGallery(true)}
              className=" transition-transform hover:scale-105"
            >
            {images.length > 0 ? (
                <div className="relative">
                  <img
                    src={images[0]}
                    alt="Latest"
                    className="w-12 h-12 rounded object-cover border-2 border-white/70 shadow-lg"
                  />
                </div>
              ) : (
                <div className="w-12 h-12 rounde bg-gray-400 border-2 border-white/50 flex items-center justify-center backdrop-blur-sm">
                  <span className="text-gray-300 text-lg">📷</span>
                </div>
              )}
          </button>
        </div>


      </div>
    </div>
  );
};
