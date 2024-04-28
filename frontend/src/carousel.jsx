import React, { useState } from 'react';
import './Carousel.css';

// Sample images
import image1 from '../public/stateimage.png';
import image2 from '../public/aadhar.png';
import image3 from '../public/aadhar.png';


const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [
    image1,
    image2,
    image3,
    // Add more images here
  ];

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === images.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className="carousel">
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img src={images[currentIndex]} alt={`Slide ${currentIndex + 1}`} />
        </div>
      </div>
      <div className="carousel-controls">
        <button className="carousel-control prev" onClick={goToPrevious}>
          &lt;
        </button>
        <div className="carousel-indicators">
          {images.map((_, index) => (
            <button
              key={index}
              className={`carousel-indicator ${currentIndex === index ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
            />
          ))}
        </div>
        <button className="carousel-control next" onClick={goToNext}>
          &gt;
        </button>
      </div>
    </div>
  );
};

export default Carousel;