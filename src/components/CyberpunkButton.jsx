import React, { useState, useEffect, useMemo } from 'react';
import './CyberpunkButton.css';

const POOL = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}<>?/|:;~";

const scrambleChars = (originalArray) => {
  return originalArray.map(char => {
    if (char === "\u00A0") return char; // Preserve spaces
    return POOL[Math.floor(Math.random() * POOL.length)];
  });
};

export default function CyberpunkButton({ children, href = "#", className = "", icon = null }) {
  const textContent = typeof children === 'string' ? children : "LEARN MORE";
  
  // Memoize the original array of characters (handling spaces properly for rendering)
  const originalChars = useMemo(() => {
    return textContent.split('').map(ch => ch === " " ? "\u00A0" : ch);
  }, [textContent]);

  const [mainChars, setMainChars] = useState(originalChars);
  const [ghost1Chars, setGhost1Chars] = useState(originalChars);
  const [ghost2Chars, setGhost2Chars] = useState(originalChars);
  const [isHovered, setIsHovered] = useState(false);

  // Sync state if textContent prop changes
  useEffect(() => {
    setMainChars(originalChars);
    setGhost1Chars(originalChars);
    setGhost2Chars(originalChars);
  }, [originalChars]);

  useEffect(() => {
    const REDUCED_MOTION = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (REDUCED_MOTION || !isHovered) {
      setMainChars(originalChars);
      setGhost1Chars(originalChars);
      setGhost2Chars(originalChars);
      return;
    }

    const FRAMES = 5;
    const TOTAL = 300;
    const intervalTime = TOTAL / FRAMES;
    let frame = 0;
    
    // Initial scramble
    setMainChars(scrambleChars(originalChars));
    setGhost1Chars(scrambleChars(originalChars));
    setGhost2Chars(scrambleChars(originalChars));

    const timer = setInterval(() => {
      frame++;
      if (frame < FRAMES) {
        setMainChars(scrambleChars(originalChars));
        setGhost1Chars(scrambleChars(originalChars));
        setGhost2Chars(scrambleChars(originalChars));
      } else {
        clearInterval(timer);
        setMainChars(originalChars);
        setGhost1Chars(originalChars);
        setGhost2Chars(originalChars);
      }
    }, intervalTime);

    return () => {
      clearInterval(timer);
    };
  }, [isHovered, originalChars]);

  const Element = href ? 'a' : 'button';

  return (
    <Element 
      href={href} 
      className={`cyberpunk-btn ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {icon && <span className="cb-icon">{icon}</span>}
      <span className="cb-text">
        {mainChars.map((char, index) => (
          <span key={index} className="cb-char">{char}</span>
        ))}
      </span>
      <span className="cb-glitch cb-g1" aria-hidden="true">
        {ghost1Chars.map((char, index) => (
          <span key={index} className="cb-char">{char}</span>
        ))}
      </span>
      <span className="cb-glitch cb-g2" aria-hidden="true">
        {ghost2Chars.map((char, index) => (
          <span key={index} className="cb-char">{char}</span>
        ))}
      </span>
      <span className="cb-scan" aria-hidden="true"></span>
    </Element>
  );
}
