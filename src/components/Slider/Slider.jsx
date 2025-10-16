import { useState, useEffect } from "react";
import "./Slider.css";
import img1 from "../../assets/images/banner1.png";
import img2 from "../../assets/images/banner2.png";
import img3 from "../../assets/images/banner3.png";

const images = [img1, img2, img3];

export default function Slider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000); 
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="slider">
      {images.map((imgSrc, index) => (
        <img
          key={index}
          src={imgSrc}
          alt={`slide-${index}`}
          className={`slide-image ${index === currentIndex ? 'active' : ''}`}
        />
      ))}
      <div className="slider-dots">
        {images.map((_, index) => (
          <span
            key={index}
            className={`dot ${index === currentIndex ? 'active' : ''}`}
            onClick={() => setCurrentIndex(index)}
          ></span>
        ))}
      </div>
    </div>
  );
}