import React, { useState } from "react";
import BlurText from "../Component/StartingAnimation";
import "../Component/BlurText.css";
import Home from "../Pages/Home"; // Assuming you have an About component

const HomeAnimation = () => {
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
            text={["Beyond Today", "", "Ahead Tomorrow!"]}
            delay={150}
            animateBy="words"
            direction="top"
            onAnimationComplete={handleAnimationComplete}
          />
        </div>
      ) : (
        <Home /> // Show About page after animation
      )}
    </div>
  );
};

export default HomeAnimation;
