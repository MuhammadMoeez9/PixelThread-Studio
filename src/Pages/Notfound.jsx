import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  useEffect(() => {
    const visual = document.getElementById("visual");
    const events = ["resize", "load"];

    const handleEvent = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const ratio = 45 / (width / height);
      visual.style.transform = `translate(-50%, -50%) rotate(-${ratio}deg)`;
    };

    events.forEach((event) => {
      window.addEventListener(event, handleEvent);
    });

    return () => {
      events.forEach((event) => {
        window.removeEventListener(event, handleEvent);
      });
    };
  }, []);

  const styles = {
    body: {
      fontFamily: "'Poppins', sans-serif",
      height: "100vh",
      background: "#121212",
      padding: "1em",
      overflow: "hidden",
    },
    a: {
      border: "2px solid #555",
      padding: "0.5em 0.8em",
      position: "fixed",
      zIndex: 1,
      color: "#555",
      textDecoration: "none",
      display: "flex",
      alignItems: "center",
      transition: "150ms",
      background: "transparent",
    },
    svgPolyline: {
      transition: "150ms",
    },
    backgroundWrapper: {
      position: "relative",
      width: "100%",
      height: "100%",
      userSelect: "none",
    },
    h1: {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%) rotate(-45deg)",
      fontFamily: "'Eczar', serif",
      fontSize: "60vmax",
      color: "#282828",
      letterSpacing: "0.025em",
      margin: 0,
      transition: "750ms ease-in-out",
    },
    p: {
      color: "#dadada",
      fontSize: "calc(1em + 3vmin)",
      position: "fixed",
      bottom: "1rem",
      right: "1.5rem",
      margin: 0,
      textAlign: "right",
      textShadow:
        "-1px -1px 0 #121212, 1px 1px 0 #121212, -1px 1px 0 #121212, 1px -1px 0 #121212",
      width: "70%", // Default
    },
  };

  // Responsive width adjustment (since inline CSS cannot handle @media easily)
  const screenWidth = window.innerWidth;
  if (screenWidth >= 1300) styles.p.width = "25%";
  else if (screenWidth >= 940) styles.p.width = "30%";
  else if (screenWidth >= 560) styles.p.width = "50%";
  else if (screenWidth >= 340) styles.p.width = "70%";

  return (
    <div style={styles.body}>
      <a href="#" style={styles.a}>
        <Link to={"/"}>
          <svg
            height="0.8em"
            width="0.8em"
            viewBox="0 0 2 1"
            preserveAspectRatio="none"
          >
            <polyline
              fill="none"
              stroke="#777777"
              strokeWidth="0.1"
              points="0.9,0.1 0.1,0.5 0.9,0.9"
              style={styles.svgPolyline}
            />
          </svg>
          &nbsp;Home
        </Link>
      </a>
      <div style={styles.backgroundWrapper}>
        <h1 id="visual" style={styles.h1}>
          404
        </h1>
      </div>
      <p style={styles.p}>The page you’re looking for does not exist.</p>
    </div>
  );
};

export default NotFound;
