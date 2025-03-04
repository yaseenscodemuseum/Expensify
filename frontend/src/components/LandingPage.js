import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./LandingPage.css";

const LandingPage = ({ onStart }) => {
  const [showButton, setShowButton] = useState(false);
  const [startAnimation, setStartAnimation] = useState(false);
  const [letters, setLetters] = useState("EXPENSIFY".split(""));
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    setTimeout(() => setShowButton(true), 1000);
  }, []);

  const handleStartClick = () => {
    setStartAnimation(true);

    // Random character shuffling effect
    let slotInterval = setInterval(() => {
      setLetters((prev) =>
        prev.map(() =>
          String.fromCharCode(65 + Math.floor(Math.random() * 26)) // Random letters
        )
      );
    }, 100);

    // After 2 seconds, transition into '$' signs
    setTimeout(() => {
      clearInterval(slotInterval);
      setLetters(Array(letters.length).fill("$"));
    }, 2000);

    // Animate all `$` moving into the center
    setTimeout(() => {
      setLetters((prev) =>
        prev.map((_, index) =>
          index === Math.floor(prev.length / 2) ? "$" : ""
        )
      );
    }, 3000);

    // **NEW FIX: Delay the loader until merging is complete**
    setTimeout(() => {
      setShowLoader(true); // Now the loader appears
    }, 4000);

    // After animation, show main page
    setTimeout(() => {
      onStart();
    }, 5000);
  };

  return (
    <div className="landing-container">
      <motion.div
        className="app-name-container"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: showButton ? -10 : 0 }}
        transition={{ duration: 1 }}
      >
        {letters.map((char, index) => (
          <motion.span
            key={index}
            className="app-letter"
            initial={{ opacity: 1, x: 0, y: 0 }}
            animate={
              startAnimation && char === "$"
                ? { x: 0, y: -10, scale: 1.2 }
                : {}
            }
            transition={{
              duration: 0.5,
              ease: "easeOut",
              delay: startAnimation ? index * 0.1 : 0,
            }}
          >
            {char}
          </motion.span>
        ))}
      </motion.div>

      {/* Clickable text animation */}
      <AnimatePresence>
        {showButton && !startAnimation && (
          <motion.p
            className="start-text"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.8 }}
            onClick={handleStartClick}
          >
            Start tracking your expenses now →
          </motion.p>
        )}
      </AnimatePresence>

      {/* **Loader appears ONLY after merging is complete** */}
      {showLoader && (
        <motion.div
          className="loading-spinner"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1, rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
      )}
    </div>
  );
};

export default LandingPage;
