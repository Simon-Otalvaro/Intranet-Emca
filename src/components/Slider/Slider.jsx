import { useState, useEffect } from "react";
import "./Slider.css";
import img1 from "../../assets/images/banner1.png";
import img2 from "../../assets/images/banner2.png";

const images = [img1, img2];

export default function Slider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000); // cada 3 segundos
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="slider">
      <img
        src={images[currentIndex]}
        alt={`slide-${currentIndex}`}
        className="slide-image"
      />
    </div>
  );
}
