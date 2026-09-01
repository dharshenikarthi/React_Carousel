import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const images = [
    {
      url: "https://images.unsplash.com/photo-1500534623283-312aade485b7?w=1400",
      title: "Golden Horizon",
      category: "Nature"
    },
    {
      url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1400",
      title: "Ocean Escape",
      category: "Travel"
    },
    {
      url: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=1400",
      title: "Mountain Serenity",
      category: "Adventure"
    },
    {
      url: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1400",
      title: "Forest Dreams",
      category: "Landscape"
    },
    {
      url: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=1400",
      title: "Wild Earth",
      category: "Exploration"
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextImage = () => {
    setCurrentIndex(
      (currentIndex + 1) % images.length
    );
  };

  const previousImage = () => {
    setCurrentIndex(
      (currentIndex - 1 + images.length) % images.length
    );
  };

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setCurrentIndex(
        (prevIndex) => (prevIndex + 1) % images.length
      );
    }, 4000);

    return () => clearInterval(interval);
  }, [isPaused, images.length]);

  return (
    <div className="app">

      {/* Background decorations */}
      <div className="orb orb-one"></div>
      <div className="orb orb-two"></div>

      <main className="carousel-wrapper">

        {/* Header */}
        <header className="header">

          <div>
            <p className="eyebrow">
              REACT EXPERIENCE
            </p>

            <h1>
              Visual <span>Gallery</span>
            </h1>

            <p className="subtitle">
              Explore moments through a beautifully
              crafted image carousel.
            </p>
          </div>

          <div className="counter">
            <span>
              {String(currentIndex + 1).padStart(2, "0")}
            </span>
            <div></div>
            <small>
              {String(images.length).padStart(2, "0")}
            </small>
          </div>

        </header>

        {/* Carousel */}
        <section
          className="carousel"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >

          <img
            key={images[currentIndex].url}
            src={images[currentIndex].url}
            alt={images[currentIndex].title}
            className="carousel-image"
          />

          {/* Overlay */}
          <div className="overlay"></div>

          {/* Image information */}
          <div className="image-info">

            <div className="category">
              {images[currentIndex].category}
            </div>

            <h2>
              {images[currentIndex].title}
            </h2>

            <p>
              Discover the beauty of the world,
              one frame at a time.
            </p>

          </div>

          {/* Navigation */}
          <button
            className="nav-button previous"
            onClick={previousImage}
            aria-label="Previous image"
          >
            ←
          </button>

          <button
            className="nav-button next"
            onClick={nextImage}
            aria-label="Next image"
          >
            →
          </button>

          {/* Pause indicator */}
          {isPaused && (
            <div className="pause-indicator">
              PAUSED
            </div>
          )}

        </section>

        {/* Bottom controls */}
        <div className="controls">

          <div className="dots">

            {images.map((image, index) => (

              <button
                key={image.url}
                className={
                  index === currentIndex
                    ? "dot active"
                    : "dot"
                }
                onClick={() =>
                  setCurrentIndex(index)
                }
                aria-label={`Go to image ${index + 1}`}
              >
                <span></span>
              </button>

            ))}

          </div>

          <div className="progress-container">
            <div
              className="progress"
              key={currentIndex}
            ></div>
          </div>

        </div>

        {/* Footer */}
        <footer>
          <span>NOVA GALLERY</span>
          <span>•</span>
          <span>BUILT WITH REACT</span>
        </footer>

      </main>

    </div>
  );
}

export default App;