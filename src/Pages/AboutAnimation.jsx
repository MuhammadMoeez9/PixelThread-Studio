import React, { useState } from "react";
import BlurText from "../Component/StartingAnimation";
import "../Component/BlurText.css";
import About from "../Pages/About"; // Assuming you have an About component

const MyComponent = () => {
  const [animationDone, setAnimationDone] = useState(false);

  const handleAnimationComplete = () => {
    console.log("Animation completed!");
    setAnimationDone(true); // Show About page after animation
  };

  return (
    <div className="h-screen w-screen">
      {!animationDone ? (
        <div className="blur-text-container">
          <BlurText
            text="Welcome to Our PixelThread Studio"
            delay={150}
            animateBy="words"
            direction="top"
            onAnimationComplete={handleAnimationComplete}
          />
        </div>
      ) : (
        <About /> // Show About page after animation
      )}
    </div>
  );
};

export default MyComponent;
