import React, { useEffect, useRef } from 'react';
import './CyberpunkButton.css';

const POOL = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}<>?/|:;~";

export default function CyberpunkButton({ children, href = "#", className = "", icon = null }) {
  const btnRef = useRef(null);
  const textRef = useRef(null);
  
  // The children prop must be a string for the glitch effect to work properly
  const textContent = typeof children === 'string' ? children : "LEARN MORE";

  useEffect(() => {
    const btn = btnRef.current;
    const textEl = textRef.current;
    if (!btn || !textEl) return;

    const REDUCED_MOTION = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Helpers
    function splitText(sourceEl) {
      const text = sourceEl.textContent;
      sourceEl.textContent = "";
      const chars = [];
      for (const ch of text) {
        const span = document.createElement("span");
        span.className = "cb-char";
        span.textContent = ch === " " ? "\u00A0" : ch;
        span.dataset.original = ch;
        sourceEl.appendChild(span);
        chars.push(span);
      }
      return chars;
    }

    function buildGhost(chars) {
      const ghost = document.createElement("span");
      ghost.className = "cb-glitch";
      ghost.setAttribute("aria-hidden", "true");
      for (let i = 0; i < chars.length; i++) {
        const span = document.createElement("span");
        span.className = "cb-char";
        span.textContent = chars[i].dataset.original === " " ? "\u00A0" : chars[i].dataset.original;
        ghost.appendChild(span);
      }
      return ghost;
    }

    function scramble(charSpans) {
      for (const span of charSpans) {
        if (span.dataset.original === " ") continue;
        span.textContent = POOL[Math.floor(Math.random() * POOL.length)];
      }
    }

    function restore(charSpans) {
      for (const span of charSpans) {
        span.textContent = span.dataset.original === " " ? "\u00A0" : span.dataset.original;
      }
    }

    // Initialize DOM structure for glitch effect
    // We only want to run this once on mount
    textEl.textContent = textContent;
    const mainChars = splitText(textEl);
    
    // Remove old ghosts if re-running
    const oldGhosts = btn.querySelectorAll('.cb-glitch');
    oldGhosts.forEach(g => g.remove());

    const ghost1 = buildGhost(mainChars); 
    ghost1.classList.add("cb-g1");
    const ghost2 = buildGhost(mainChars); 
    ghost2.classList.add("cb-g2");
    
    textEl.insertAdjacentElement("afterend", ghost1);
    ghost1.insertAdjacentElement("afterend", ghost2);

    const ghost1Chars = Array.from(ghost1.querySelectorAll(".cb-char"));
    const ghost2Chars = Array.from(ghost2.querySelectorAll(".cb-char"));

    if (REDUCED_MOTION) return;

    let glitchTimer = null;
    let restoreTimer = null;

    function startGlitch() {
      const FRAMES = 5;
      const TOTAL = 300;

      clearTimeout(glitchTimer);
      clearTimeout(restoreTimer);

      scramble(mainChars);
      scramble(ghost1Chars);
      scramble(ghost2Chars);

      let frame = 0;
      function tick() {
        frame++;
        if (frame < FRAMES) {
          scramble(mainChars);
          scramble(ghost1Chars);
          scramble(ghost2Chars);
          glitchTimer = setTimeout(tick, TOTAL / FRAMES);
        } else {
          restore(mainChars);
          restore(ghost1Chars);
          restore(ghost2Chars);
        }
      }
      glitchTimer = setTimeout(tick, TOTAL / FRAMES);
    }

    function stopGlitch() {
      clearTimeout(glitchTimer);
      clearTimeout(restoreTimer);
      restore(mainChars);
      restore(ghost1Chars);
      restore(ghost2Chars);
    }

    btn.addEventListener("mouseenter", startGlitch);
    btn.addEventListener("mouseleave", stopGlitch);

    return () => {
      btn.removeEventListener("mouseenter", startGlitch);
      btn.removeEventListener("mouseleave", stopGlitch);
      clearTimeout(glitchTimer);
      clearTimeout(restoreTimer);
    };
  }, [textContent]);

  const Element = href ? 'a' : 'button';

  return (
    <Element 
      href={href} 
      className={`cyberpunk-btn ${className}`} 
      ref={btnRef}
    >
      {icon && <span className="cb-icon">{icon}</span>}
      <span className="cb-text" ref={textRef}>{textContent}</span>
      <span className="cb-scan" aria-hidden="true"></span>
    </Element>
  );
}
