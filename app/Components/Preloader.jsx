"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useEffect, useState, useRef } from "react";

gsap.registerPlugin(SplitText);
gsap.registerPlugin(ScrollTrigger);

export default function Preloader() {
  const [loaded, setLoaded] = useState(false);
  const [percent, setPercent] = useState(0);
  const intervalRef = useRef(null);
  const preloader = useRef(null);

  // ⭐ ENTER ANIMATION (initial text animation)
  useGSAP(() => {
    const s1 = new SplitText(".text-load1", { type: "chars", charsClass: "char" });
    const s2 = new SplitText(".text-load2", { type: "chars", charsClass: "char" });
    const s3 = new SplitText(".text-load3", { type: "chars", charsClass: "char" });

    [s1, s2, s3].forEach((split) => {
      split.chars.forEach((char) => {
        const wrap = document.createElement("span");
        wrap.classList.add("inline-block", "overflow-hidden");
        char.parentNode.insertBefore(wrap, char);
        wrap.appendChild(char);
      });
    });

    gsap.from(s1.chars, {
      opacity:0,
      x: -80,
      duration: 1.4,
      stagger: 0.02,
      ease: "power4.out",
    });

    gsap.from(s2.chars, {
      opacity:0,
      y: -80,
      duration: 1.4,
      stagger: 0.02,
      ease: "power4.out",
    });

    gsap.from(s3.chars, {
      opacity:0,
      x: 80,
      duration: 1.4,
      stagger: 0.02,
      ease: "power4.out",
    });
  });

  // ⭐ EXIT ANIMATION (only when loaded becomes true)
  useGSAP(
    () => {
      const tl = gsap.timeline();

      tl.to(".text-load1, .text-load2, .text-load3", {
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.inOut",
      })
        .to(
          preloader.current,
          {
            opacity: 0,
            duration: 0.8,
            ease: "power3.inOut",
            pointerEvents: "none",
          },
          "-=0.4"
        );
    },
    { dependencies: [loaded] } // 👈 Runs when loaded === true
  );

  // Loading Logic
  useEffect(() => {
    document.documentElement.classList.add("loading");
    document.body.classList.add("loading");

    const startProgress = () => {
      intervalRef.current = setInterval(() => {
        setPercent((p) => {
          if (p < 60) return p + Math.floor(Math.random() * 6);
          if (p < 90) return p + Math.floor(Math.random() * 3);
          return Math.min(98, p + Math.floor(Math.random() * 2));
        });
      }, 200);
    };

    startProgress();

    const onPageLoad = () => {
      setPercent(100);
      setLoaded(true);
      clearInterval(intervalRef.current);

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
      ref={preloader}
      className={`fixed inset-0 z-[99999] bg-black flex items-center justify-center flex-col font-[PPNeueMontreal]`}
    >
      <div className="overflow-hidden">
        <h1 className="font-bold xl:text-[4vw] text-load1 text-white">Nothing</h1>
      </div>
      <div className="overflow-hidden">
        <h1 className="font-bold xl:text-[4vw] text-load2 text-white">2</h1>
      </div>
      <div className="overflow-hidden">
        <h1 className="font-bold xl:text-[4vw] text-load3 text-white">Real</h1>
      </div>

      <h1 className="text-white xl:text-[5vw] absolute bottom-10 right-10">
        {Math.floor(percent)}%
      </h1>
    </div>
  );
}
