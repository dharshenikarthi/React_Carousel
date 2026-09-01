# Ex05 Image Carousel
## Date: 01/09/2026

## AIM
To create a Image Carousel using React 

## ALGORITHM
### STEP 1 Initial Setup:
Input: A list of images to display in the carousel.

Output: A component displaying the images with navigation controls (e.g., next/previous buttons).

### Step 2 State Management:
Use a state variable (currentIndex) to track the index of the current image displayed.

The carousel starts with the first image, so initialize currentIndex to 0.

### Step 3 Navigation Controls:
Next Image: When the "Next" button is clicked, increment currentIndex.

If currentIndex is at the end of the image list (last image), loop back to the first image using modulo:
currentIndex = (currentIndex + 1) % images.length;

Previous Image: When the "Previous" button is clicked, decrement currentIndex.

If currentIndex is at the beginning (first image), loop back to the last image:
currentIndex = (currentIndex - 1 + images.length) % images.length;

### Step 4 Displaying the Image:
The currentIndex determines which image is displayed.

Using the currentIndex, display the corresponding image from the images list.

### Step 5 Auto-Rotation:
Set an interval to automatically change the image after a set amount of time (e.g., 3 seconds).

Use setInterval to call the nextImage() function at regular intervals.

Clean up the interval when the component unmounts using clearInterval to prevent memory leaks.

## PROGRAM
### App.js
```
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
```
### App.css
```
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family:
    "Segoe UI",
    Arial,
    sans-serif;

  background: #050816;
  color: white;
}

button {
  font-family: inherit;
}

/* =========================
   MAIN APP
========================= */

.app {
  min-height: 100vh;

  display: flex;
  justify-content: center;
  align-items: center;

  padding: 50px 20px;

  position: relative;
  overflow: hidden;

  background:
    radial-gradient(
      circle at 10% 10%,
      rgba(99, 102, 241, 0.18),
      transparent 30%
    ),
    radial-gradient(
      circle at 90% 90%,
      rgba(6, 182, 212, 0.14),
      transparent 30%
    ),
    linear-gradient(
      135deg,
      #020617,
      #080b1d,
      #111827
    );
}

/* =========================
   GLOWING ORBS
========================= */

.orb {
  position: absolute;

  width: 350px;
  height: 350px;

  border-radius: 50%;

  filter: blur(120px);

  opacity: 0.2;

  pointer-events: none;
}

.orb-one {
  background: #6366f1;

  top: -150px;
  left: -100px;
}

.orb-two {
  background: #06b6d4;

  bottom: -150px;
  right: -100px;
}

/* =========================
   WRAPPER
========================= */

.carousel-wrapper {
  width: 1100px;
  max-width: 100%;

  position: relative;
  z-index: 2;
}

/* =========================
   HEADER
========================= */

.header {
  display: flex;

  justify-content: space-between;
  align-items: flex-end;

  margin-bottom: 28px;
}

.eyebrow {
  font-size: 11px;

  letter-spacing: 4px;

  color: #818cf8;

  font-weight: 700;

  margin-bottom: 10px;
}

h1 {
  font-size: clamp(38px, 5vw, 64px);

  line-height: 1;

  letter-spacing: -3px;

  font-weight: 800;
}

h1 span {
  color: #818cf8;
}

.subtitle {
  margin-top: 15px;

  max-width: 500px;

  color: #94a3b8;

  font-size: 15px;

  line-height: 1.6;
}

/* =========================
   COUNTER
========================= */

.counter {
  display: flex;

  align-items: center;

  gap: 12px;

  color: #64748b;
}

.counter span {
  color: white;

  font-size: 32px;

  font-weight: 700;
}

.counter small {
  font-size: 14px;
}

.counter div {
  width: 35px;

  height: 1px;

  background: #475569;
}

/* =========================
   CAROUSEL
========================= */

.carousel {
  position: relative;

  width: 100%;

  height: 590px;

  overflow: hidden;

  border-radius: 28px;

  border: 1px solid
    rgba(255, 255, 255, 0.12);

  background: #0f172a;

  box-shadow:
    0 30px 80px
      rgba(0, 0, 0, 0.55),
    0 0 0 1px
      rgba(255, 255, 255, 0.03);

  cursor: default;
}

/* =========================
   IMAGE
========================= */

.carousel-image {
  width: 100%;
  height: 100%;

  object-fit: cover;

  display: block;

  animation: imageReveal 0.7s ease;
}

@keyframes imageReveal {

  from {
    opacity: 0;

    transform:
      scale(1.08);
  }

  to {
    opacity: 1;

    transform:
      scale(1);
  }

}

/* =========================
   OVERLAY
========================= */

.overlay {
  position: absolute;

  inset: 0;

  background:
    linear-gradient(
      90deg,
      rgba(2, 6, 23, 0.9),
      rgba(2, 6, 23, 0.25),
      rgba(2, 6, 23, 0.1)
    ),
    linear-gradient(
      0deg,
      rgba(2, 6, 23, 0.85),
      transparent 55%
    );

  pointer-events: none;
}

/* =========================
   IMAGE INFO
========================= */

.image-info {
  position: absolute;

  left: 50px;
  bottom: 55px;

  max-width: 520px;
}

.category {
  display: inline-block;

  padding: 7px 13px;

  border-radius: 50px;

  font-size: 10px;

  letter-spacing: 2px;

  font-weight: 700;

  color: #c4b5fd;

  background:
    rgba(99, 102, 241, 0.18);

  border: 1px solid
    rgba(129, 140, 248, 0.3);

  backdrop-filter: blur(10px);

  margin-bottom: 18px;
}

.image-info h2 {
  font-size: clamp(38px, 5vw, 60px);

  line-height: 1;

  letter-spacing: -2px;

  margin-bottom: 15px;
}

.image-info p {
  color: #cbd5e1;

  font-size: 14px;

  line-height: 1.6;
}

/* =========================
   NAVIGATION BUTTONS
========================= */

.nav-button {
  position: absolute;

  top: 50%;

  transform: translateY(-50%);

  width: 55px;
  height: 55px;

  border-radius: 50%;

  border: 1px solid
    rgba(255, 255, 255, 0.2);

  background:
    rgba(15, 23, 42, 0.55);

  color: white;

  font-size: 25px;

  cursor: pointer;

  backdrop-filter: blur(15px);

  transition:
    0.25s ease;

  z-index: 5;
}

.nav-button:hover {
  background: white;

  color: #020617;

  transform:
    translateY(-50%)
    scale(1.1);
}

.previous {
  left: 25px;
}

.next {
  right: 25px;
}

/* =========================
   PAUSE
========================= */

.pause-indicator {
  position: absolute;

  top: 25px;
  right: 25px;

  padding: 8px 14px;

  border-radius: 30px;

  font-size: 9px;

  letter-spacing: 2px;

  background:
    rgba(2, 6, 23, 0.55);

  border: 1px solid
    rgba(255, 255, 255, 0.12);

  backdrop-filter: blur(15px);

  color: #cbd5e1;
}

/* =========================
   CONTROLS
========================= */

.controls {
  margin-top: 22px;

  display: flex;

  align-items: center;

  justify-content: space-between;

  gap: 30px;
}

.dots {
  display: flex;

  gap: 7px;

  align-items: center;
}

.dot {
  width: 25px;
  height: 5px;

  border: none;

  padding: 0;

  border-radius: 20px;

  background: #334155;

  cursor: pointer;

  overflow: hidden;

  transition:
    0.3s ease;
}

.dot.active {
  width: 45px;

  background: #818cf8;
}

.dot:hover {
  background: #a5b4fc;
}

.dot span {
  display: block;

  width: 100%;
  height: 100%;
}

/* =========================
   PROGRESS
========================= */

.progress-container {
  flex: 1;

  max-width: 300px;

  height: 2px;

  background: #1e293b;

  overflow: hidden;
}

.progress {
  height: 100%;

  width: 100%;

  background: #818cf8;

  transform-origin: left;

  animation:
    progress 4s linear;
}

@keyframes progress {

  from {
    transform: scaleX(0);
  }

  to {
    transform: scaleX(1);
  }

}

/* =========================
   FOOTER
========================= */

footer {
  margin-top: 25px;

  display: flex;

  justify-content: center;

  gap: 12px;

  font-size: 9px;

  letter-spacing: 3px;

  color: #475569;
}

footer span:first-child {
  color: #64748b;
}

/* =========================
   RESPONSIVE
========================= */

@media (max-width: 800px) {

  .app {
    padding: 30px 15px;
  }

  .header {
    align-items: flex-start;
  }

  .counter {
    display: none;
  }

  .carousel {
    height: 500px;

    border-radius: 22px;
  }

  .image-info {
    left: 25px;
    bottom: 35px;

    right: 25px;
  }

  .image-info h2 {
    font-size: 40px;
  }

  .previous {
    left: 15px;
  }

  .next {
    right: 15px;
  }

  .nav-button {
    width: 48px;
    height: 48px;
  }

  .controls {
    gap: 15px;
  }

  .progress-container {
    max-width: 150px;
  }

}

@media (max-width: 500px) {

  h1 {
    letter-spacing: -2px;
  }

  .subtitle {
    font-size: 13px;
  }

  .carousel {
    height: 430px;
  }

  .image-info h2 {
    font-size: 34px;
  }

  .image-info p {
    font-size: 12px;
  }

  .progress-container {
    display: none;
  }

}
```
### index.css
```
body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
    monospace;
}

```
### index.html
```
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#000000" />
    <meta
      name="description"
      content="Web site created using create-react-app"
    />
    <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" />
    <!--
      manifest.json provides metadata used when your web app is installed on a
      user's mobile device or desktop. See https://developers.google.com/web/fundamentals/web-app-manifest/
    -->
    <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
    <!--
      Notice the use of %PUBLIC_URL% in the tags above.
      It will be replaced with the URL of the `public` folder during the build.
      Only files inside the `public` folder can be referenced from the HTML.

      Unlike "/favicon.ico" or "favicon.ico", "%PUBLIC_URL%/favicon.ico" will
      work correctly both with client-side routing and a non-root public URL.
      Learn how to configure a non-root public URL by running `npm run build`.
    -->
    <title>React App</title>
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
    <!--
      This HTML file is a template.
      If you open it directly in the browser, you will see an empty page.

      You can add webfonts, meta tags, or analytics to this file.
      The build step will place the bundled scripts into the <body> tag.

      To begin the development, run `npm start` or `yarn start`.
      To create a production bundle, use `npm run build` or `yarn build`.
    -->
  </body>
</html>

```
## OUTPUT

<img width="1911" height="1081" alt="image" src="https://github.com/user-attachments/assets/fcec00ac-7a98-43ce-bfe3-9d03c4989422" />


## RESULT
The program for creating Image Carousel using React is executed successfully.
