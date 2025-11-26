"use client";
import { useEffect, useState, useRef } from "react";

export default function Preloader() {
  const [loaded, setLoaded] = useState(false);
  const [percent, setPercent] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    // Lock html & body fully
    document.documentElement.classList.add("loading");
    document.body.classList.add("loading");

    const startProgress = () => {
      intervalRef.current = setInterval(() => {
        setPercent((p) => {
          if (p < 60) return p + Math.random() * 6;
          if (p < 90) return p + Math.random() * 3;
          return Math.min(98, p + Math.random() * 1);
        });
      }, 200);
    };

    startProgress();

    const onPageLoad = () => {
      setPercent(100);
      setLoaded(true);

      clearInterval(intervalRef.current);

      // Fade-out ki match ga delay
      setTimeout(() => {
        document.documentElement.classList.remove("loading");
        document.body.classList.remove("loading");
      }, 800);
    };

    if (document.readyState === "complete") {
      onPageLoad();
    } else {
      window.addEventListener("load", onPageLoad);
      return () => window.removeEventListener("load", onPageLoad);
    }
  }, []);

  return (
    <div
      id="preloader"
      className={`fixed inset-0 z-[99999] bg-black flex items-center justify-center transition-all duration-700 ${
        loaded ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <h1 className="text-white text-4xl">{percent}%</h1>
    </div>
  );
}
