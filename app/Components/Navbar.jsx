"use client";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import HoverText from "./HoverText";
import gsap from "gsap";
import { useTransitionRouter } from "next-view-transitions";
import { useGSAP } from "@gsap/react";
import { ArrowRight } from "lucide-react";

const Navbar = () => {
  const router = useTransitionRouter();
  const lineRefs = useRef([]);
  const mail = useRef(null);
  const lineMail = useRef(null);
  const navRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [conOpen, setConOpen] = useState(false);
  const [coOpen, setCoOpen] = useState(false);
  const button2 = useRef(null);
  const hoverFill2 = useRef(null);
  const textHover2 = useRef(null);
  const arrow2 = useRef(null);
  const conRef = useRef(null);
  const coRef = useRef(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    projectType: "Website",
    budget: "₹50k – ₹1L",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error("Failed to send");
      }

      setSuccess(true);
      setFormData({
        name: "",
        email: "",
        company: "",
        projectType: "Website",
        budget: "₹50k – ₹1L",
        message: "",
      });
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };


  const links = [
    { name: "Home", href: "/" },
    { name: "Studio", href: "/studio" },
    { name: "Project", href: "/project" },
    { name: "Process", href: "/process" },
  ];

  // ✅ Smooth 60fps animation using will-change and GPU acceleration
  useEffect(() => {
    if (!navRef.current) return;

    navRef.current.style.willChange = "clip-path, transform, opacity";
    gsap.set(".textN", { willChange: "transform, opacity" });

    if (menuOpen) {
      gsap.to(navRef.current, {
        clipPath: "inset(0% 0% 0% 0%)",
        duration: 1.05,
        ease: "power4.inOut",
        pointerEvents: "auto",
        force3D: true,
      });

      gsap.fromTo(
        ".textN",
        { y: 300, opacity: 1, force3D: true },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power4.out",
          stagger: 0.03,
          delay: 0.32,
        }
      );
    } else {
      gsap.to(navRef.current, {
        clipPath: "inset(0% 0% 100% 0%)",
        duration: 0.6,
        ease: "power3.inOut",
        pointerEvents: "none",
        force3D: true,
      });
    }
  }, [menuOpen]);


  useEffect(() => {
    if (!coRef.current) return;

    gsap.set(coRef.current, {
      opacity: 0,
      pointerEvents: "none",
      zIndex: -1,
    });

    if (coOpen) {
      gsap.to(coRef.current, {
        opacity: 1,
        duration: 1.1,
        ease: "power3.out",
        pointerEvents: "auto",
        zIndex: 40,
      });
    } else {
      gsap.to(coRef.current, {
        opacity: 0,
        duration: 1.1,
        ease: "power3.in",
        pointerEvents: "none",
        zIndex: -1,
      });
    }
  }, [coOpen]);

  useEffect(() => {
    if (!conRef.current) return;

    gsap.set(conRef.current, {
      x: 1500,
      pointerEvents: "none",
    });

    if (conOpen) {
      gsap.to(conRef.current, {
        x: 0,
        duration: 1.5,
        ease: "power4.out",
        pointerEvents: "auto",
      });
    } else {
      gsap.to(conRef.current, {
        x: 1500,
        duration: 1.5,
        ease: "power4.inOut",
      });
    }
  }, [conOpen]);


  const freezeScroll = () => {
    const scrollY = window.scrollY;
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.left = "0";
    document.body.style.right = "0";
    document.body.style.width = "100%";
    document.body.dataset.scrollY = scrollY;
  };

  const unfreezeScroll = () => {
    const scrollY = document.body.dataset.scrollY;
    document.body.style.position = "";
    document.body.style.top = "";
    document.body.style.left = "";
    document.body.style.right = "";
    document.body.style.width = "";
    window.scrollTo(0, parseInt(scrollY || "0"));
  };

  useEffect(() => {
    menuOpen ? freezeScroll() : unfreezeScroll();
  }, [menuOpen]);
  useEffect(() => {
    coOpen || conOpen ? freezeScroll() : unfreezeScroll();
  }, [coOpen, conOpen]);


  const openContact = () => {
    setCoOpen(true);
    setTimeout(() => setConOpen(true), 50);
  };

  const closeContact = () => {
    setConOpen(false);
    setTimeout(() => setCoOpen(false), 50);
  };



  // ✅ Button hover fill (GPU accelerated)
  useGSAP(() => {
    const btn = button2.current;
    const dot = hoverFill2.current;
    const arrowEl = arrow2.current;

    gsap.set(dot, { width: 0, height: 0, scale: 0, transformOrigin: "center center", willChange: "transform", force3D: true });

    const moveHandler = (e) => {
      const rect = btn.getBoundingClientRect();
      gsap.to(dot, {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        duration: 0.3,
        ease: "power3.out",
        force3D: true,
      });
    };

    const enterHandler = () => {
      gsap.to(dot, { width: 50, height: 50, scale: 10, duration: 1.3, ease: "power4.out", force3D: true });
      gsap.to(arrowEl, { x: 10, duration: 0.4, ease: "power4.out" });
    };

    const leaveHandler = () => {
      gsap.to(dot, { width: 0, height: 0, scale: 0, duration: 0.9, ease: "power4.inOut", force3D: true });
      gsap.to(arrowEl, { x: 0, duration: 0.4, ease: "power4.inOut" });
    };

    btn.addEventListener("mousemove", moveHandler);
    btn.addEventListener("mouseenter", enterHandler);
    btn.addEventListener("mouseleave", leaveHandler);

    return () => {
      btn.removeEventListener("mousemove", moveHandler);
      btn.removeEventListener("mouseenter", enterHandler);
      btn.removeEventListener("mouseleave", leaveHandler);
    };
  }, []);


  useEffect(() => {
    document.fonts.ready.then(() => {
    });
  }, []);



  return (
    <>
      <div
        ref={coRef}
        className="fixed top-0 right-0 w-full backdrop-blur-2xl h-full md:h-screen  p-[1vw] text-white z-40 ">
        <div ref={conRef} className="md:w-1/2 h-full w-full bg-black md:ml-[50%] font-[PPNeueMontreal]  relative p-[5vw] md:p-[2vw] rounded-sm">


          <button
            onClick={closeContact}
            className="absolute top-6 right-6 text-xs uppercase opacity-60 hover:opacity-100"
          >
            Close
          </button>

          <div className="h-full flex flex-col justify-center">
            <h2 className="formItem text-[8vw] md:text-[3vw] font-bold leading-tighter uppercase mb-8">
              Start a Project
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6 font-mono text-sm">
              <div className="formItem">
                <label>Name</label>
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full bg-transparent border-b p-2 outline-none"
                />
              </div>

              <div className="formItem">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-transparent border-b p-2 outline-none"
                />
              </div>

              <div className="formItem">
                <label>Company / Brand</label>
                <input
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full bg-transparent border-b p-2 outline-none"
                />
              </div>

              <div className="formItem">
                <label>Project Type</label>
                <select
                  name="projectType"
                  value={formData.projectType}
                  onChange={handleChange}
                  className="w-full bg-black border-b p-2 outline-none"
                >
                  <option>Website</option>
                  <option>Web App</option>
                  <option>Branding</option>
                  <option>UI/UX</option>
                </select>
              </div>

              <div className="formItem">
                <label>Estimated Budget</label>
                <select
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  className="w-full bg-black border-b p-2 outline-none"
                >
                  <option>₹50k – ₹1L</option>
                  <option>₹1L – ₹3L</option>
                  <option>₹3L+</option>
                </select>
              </div>

              <div className="formItem">
                <label>Project Brief</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  required
                  className="w-full bg-transparent border p-2 outline-none resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="formItem border px-6 py-3 uppercase mt-4 opacity-80 hover:opacity-100"
              >
                {loading ? "Sending..." : "Send Enquiry →"}
              </button>

              {success && (
                <p className="text-green-400 text-sm mt-4">
                  ✔ Enquiry sent successfully. We’ll contact you soon.
                </p>
              )}

              {error && (
                <p className="text-red-400 text-sm mt-4">
                  {error}
                </p>
              )}
            </form>

          </div>

        </div>

      </div>

      {/* ✅ Fullscreen Menu Overlay */}
      <div ref={navRef} className="w-screen h-[70%] fixed top-0 left-0  flex-col  bg-black text-white z-20 flex items-start justify-start"
        style={{
          clipPath: "inset(0% 0% 100% 0%)",
          pointerEvents: "none",
        }}
      >
        <div
          style={{ fontStretch: "75%" }} className="md:w-1/2 h-full flex-col  flex items-start mx-[5vw] md:mx-[2vw] font-[PPNeueMontreal] font-bold uppercase  xl:text-[3vw] xl:leading-[3vw] text-[11vw] leading-[10.5vw] md:text-[8vw] md:leading-[7.5vw] lg:text-[7vw] lg:leading-[6.5vw] space-y-2  justify-center "  >
          {links.map((link, i) => (
            <div key={link.name} className="relative tracking-tight overflow-hidden group cursor-pointer" >
              <HoverText>
                <h1 className="overflow-hidden ">
                  <a
                    onClick={(e) => {
                      e.preventDefault();
                      setMenuOpen(false);
                      router.push(link.href, { onTransitionReady: pageAnimation });
                    }}
                    href={link.href}
                    className="block overflow-hidden textN relative"
                  >
                    {link.name}
                  </a>
                </h1>
              </HoverText>
            </div>
          ))}
        </div>
        <div className="mt-[6vw] md:mt-[3vw] text-[4vw] font-[PPNeueMontreal] font-semibold md:text-[1.2vw]  px-[2vw] tracking-tight text-gray-300 space-y-2">
          <p className="opacity-80">Get in Touch</p>
          <div className="flex gap-8 font-mono overflow-hidden group uppercase">
            <div className="overflow-hidden">
              <a href="mailto:hello@nrstudios.in" className="hover:text-white textN transition">hello@nrstudios.in</a>
            </div>
            <div className="overflow-hidden">
              <a href="https://www.instagram.com/nrstudio.tech/" target="_blank" className="hover:text-white textN transition">Instagram</a>
            </div>
            <div className="overflow-hidden">
              <a href="https://linkedin.com/company/nrstudios" target="_blank" className="hover:text-white textN transition">LinkedIn</a>
            </div>
          </div>
        </div>
      </div>

      {/* ✅ Top Navbar */}
      <div
        style={{ fontFamily: "MyFont2" }}
        className="w-full fixed top-0 text-white mix-blend-difference left-0 p-5 md:px-[2vw] xl:px-[2vw] z-20 "
      >
        <div className="flex justify-between items-center border-b pb-1">
          <div
            style={{ fontStretch: "75%" }}
            className="overflow-hidden text-[5vw] uppercase font-[dbsharp] font-semibold sm:text-[3vw] text-white xl:text-[1.5vw] xl:leading-[1.5vw]"
          >
            <Link
              onClick={(e) => {
                e.preventDefault();
                router.push("/", { onTransitionReady: pageAnimation });
              }}
              href="/"
            >
              <HoverText>
                <h1>NR.Studio©</h1>
              </HoverText>
            </Link>
          </div>

          {/* Right side */}
          <div className="flex items-center justify-center gap-5">
            <div

              style={{ fontStretch: "75%" }}
              className="relative overflow-hidden md:block hidden xl:text-[1.5vw] xl:leading-[1.5vw] font-semibold font-[dbsharp]" >
              <HoverText>
                <h1>HELLO@NRSTUDIOS.IN</h1>
              </HoverText>
              <span ref={lineMail} className="absolute left-0 bottom-0 h-[0.1vw] bg-white w-full origin-left scale-x-0" ></span>
            </div>

            <div className="overflow-hidden button">
              <button
                onClick={openContact}
                ref={button2}
                className="relative z-20 cursor-pointer w-[100px] h-[35px] md:w-[120px] md:h-[41px] border border-white rounded-full font-[dbsharp] font-semibold overflow-hidden uppercase tracking-wider flex items-center justify-center" >
                {menuOpen ? "Close" : "Contact"}{" "}
                <ArrowRight ref={arrow2} strokeWidth={2} className="-rotate-45" />{" "}
              </button>
            </div>

            <div className="overflow-hidden button">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                ref={button2}
                className="relative cursor-pointer w-[100px] h-[35px] md:w-[120px] md:h-[41px] z-40 border border-white rounded-full font-[dbsharp] font-semibold overflow-hidden uppercase tracking-wider" >
                <span ref={hoverFill2} className="absolute w-[30px] h-[30px] bg-white inset-0 rounded-full will-change-transform scale-0"></span>
                <span ref={textHover2} className="relative z-10 text-[4vw] md:text-[2.5vw] lg:text-[2vw] xl:text-[1vw] text-white flex items-center justify-center gap-3 mix-blend-difference" >
                  {menuOpen ? "Close" : "Menu"}{" "}
                  <ArrowRight ref={arrow2} strokeWidth={2} className="-rotate-45" />{" "}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

// ✅ Page transition animation
const pageAnimation = () => {
  const oldView = document.documentElement;

  // Animate OLD page – fade + slight move up
  oldView.animate(
    [
      { opacity: 1, transform: "translateY(0px)" },
      { opacity: 0, transform: "translateY(-40px)" }
    ],
    {
      duration: 500,
      easing: "cubic-bezier(0.4, 0, 0.2, 1)",
      pseudoElement: "::view-transition-old(root)",
      fill: "forwards"
    }
  );

  // Animate NEW page – fade in + move from bottom
  oldView.animate(
    [
      { opacity: 0, transform: "translateY(40px)" },
      { opacity: 1, transform: "translateY(0px)" }
    ],
    {
      duration: 650,
      easing: "cubic-bezier(0.4, 0, 0.2, 1)",
      pseudoElement: "::view-transition-new(root)",
      fill: "forwards"
    }
  );
};


export default Navbar;
