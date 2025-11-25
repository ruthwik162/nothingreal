"use client";
import { images } from "@/public/assets/assets";
import React from "react";
import HoverText from "./HoverText";
import Link from "next/link";
import { useTransitionRouter } from "next-view-transitions";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const Footer = () => {
  const router = useTransitionRouter();

  const links = [
    { name: "Home", href: "/" },
    { name: "Studio", href: "/studio" },
    { name: "Project", href: "/project" },
    { name: "Process", href: "/process" },
  ];

  useGSAP(()=>{
    gsap.set(".image",{
        scale:1.3
    })
  })

  const handleNavigate = (e, href) => {
    e.preventDefault();
    // Animate out
    pageAnimation();

    // Scroll to top smoothly
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });

    // Route transition
    router.push(href, { onTransitionReady: pageAnimation });
  };

  return (
    <footer className="w-full min-h-screen md:h-screen overflow-hidden bg-white py-[2vw] px-[2vw] ">
      <div className="grid md:grid-cols-12 grid-cols-1 gap-4 md:mt-[10vw] border-t border-black/70 xl:mt-[2vw] pt-[2vw] mt-[2vw]">
        {/* Left Logo */}
        <div className="w-full  md:h-[450px] xl:h-[400px] 2xl:h-[400px]  md:col-start-1  md:col-span-3 overflow-hidden">
          <img
            src={images.mobileLogo.src}
            className="w-full h-full object-center image object-cover"
            alt="NR Studio Logo"
          />
        </div>

        {/* Center Navigation */}
        <div className="md:col-start-5 md:col-span-4 text-black items-start justify-start">
          <h1 className="font-bold font-[PPNeueMontreal] xl:text-[1vw]">
            (Navigations)
          </h1>
          <div
            style={{ fontStretch: "75%" }}
            className="h-full flex-col flex items-start font-[PPNeueMontreal] font-bold uppercase xl:text-[4.5vw] xl:leading-[4vw] text-[10vw] leading-[9.5vw] md:text-[7vw] md:leading-[6.5vw] lg:text-[6vw] lg:leading-[5.5vw] space-y-2 justify-start"
          >
            {links.map((link) => (
              <div key={link.name}>
                <HoverText>
                  <h1 className="overflow-hidden ">
                    <a
                      href={link.href}
                      onClick={(e) => handleNavigate(e, link.href)}
                      className="block overflow-hidden textN relative"
                    >
                      {link.name}
                    </a>
                  </h1>
                </HoverText>
              </div>
            ))}
          </div>
        </div>

        {/* Right Info / Acknowledgement */}
        <div className="md:col-start-10 md:col-span-3 flex flex-col justify-between text-black font-[PPNeueMontreal] mt-[3vw] md:mt-0">
          <div>
            <h1 className="font-bold xl:text-[1vw] lg:text-[1.5vw] md:text-[2vw] text-[3.vw] uppercase mb-2">
              (Acknowledgement)
            </h1>
            <p className="text-[3vw] md:text-[1vw] leading-tight font-medium text-black/70">
              Built with dedication by the <span className="font-bold">NR Studio</span> team —
              turning every vision into a crafted digital experience. Special thanks
              to our early supporters and collaborators for believing in our journey.
            </p>
          </div>

          <div className="mt-[3vw]">
            <h1 className="font-bold xl:text-[1vw] mb-2">(Contact)</h1>
            <p className="text-[3vw] md:text-[1vw] text-black/70">
              info@nrstudio.design <br />
              Hyderabad, India
            </p>
          </div>
        </div>
      </div>

      {/* Footer Title */}
      <div className="overflow-hidden font-[dbsharp] font-bold font-stretch-75% xl:text-[11vw] lg:text-[12vw] md:text-[14vw] text-[15vw] uppercase text-black ">
        <h1>NR.Studio</h1>
      </div>

      {/* Bottom Line */}
      <div className="w-full flex flex-col md:flex-row justify-between items-center  text-black/50 text-[3vw] md:text-[0.9vw] font-bold font-[PPNeueMontreal]">
        <p>© {new Date().getFullYear()} NR Studio. All rights reserved.</p>
        <p>Designed & Developed by NR Studio Team</p>
      </div>
    </footer>
  );
};

const pageAnimation = () => {
  document.documentElement.animate(
    [
      { opacity: 1, scale: 1, transform: "translateY(0)" },
      { opacity: 0.9, scale: 1, transform: "translateY(-30%)" },
    ],
    {
      duration: 1500,
      easing: "cubic-bezier(0.87, 0, 0.13,1)",
      fill: "forwards",
      pseudoElement: "::view-transition-old(root)",
    }
  );

  document.documentElement.animate(
    [
      {
        scale: 1,
        clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)",
      },
      {
        scale: 1,
        clipPath: "polygon(0 100%, 100% 100%, 100% 0%, 0% 0%)",
      },
    ],
    {
      duration: 1500,
      easing: "cubic-bezier(0.87, 0, 0.13,1)",
      fill: "forwards",
      pseudoElement: "::view-transition-new(root)",
    }
  );
};

export default Footer;
