import { CameraIcon } from "lucide-react";
import { useRef, useState } from "react";
import Webcam from "react-webcam";

export function Camera(){
  const webcamRef = useRef(null);
  const [images, setImages] = useState([]);

  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImages((prev) => [...prev, imageSrc]);
  };

  return (
        <>
        <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            style={{ width: "100%", maxWidth: "500px" }}
          />
          <br />
          <button onClick={capture}><CameraIcon/></button>

          {images.map((image) => (
            <img src={image} alt="Captured" style={{ width: "100%", maxWidth: "500px" }} />
          ))}
        </>
  );
};
