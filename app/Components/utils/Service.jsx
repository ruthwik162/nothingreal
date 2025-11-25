"use client"

import { services } from '@/public/assets/assets'
import { useGSAP } from '@gsap/react';
import ReactLenis from '@studio-freight/react-lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import React, { useRef } from 'react'

gsap.registerPlugin(ScrollTrigger);

const Card = ({ id, desc, title, img }) => {
    return (
        <div className='card relative' id={`card-${id + 1}`}>
            <div className="card-inner relative p-[2vw] gap-[5vw] flex items-center justify-between">
                <div className="content text-black flex-3">
                    <h2 className='xl:text-[3vw]'>{title}</h2>
                    <p className='xl:text-[1.5vw]'>{desc}</p>
                </div>
                <div className="card-img flex-1">
                    <img src={img.src} />
                </div>
            </div>
        </div>
    )
}

const Service = () => {
    const containerCard = useRef(null);

    useGSAP(() => {
        const cards = gsap.utils.toArray(containerCard.current.querySelectorAll(".card"));

        // Pin the intro once
        ScrollTrigger.create({
            trigger: ".intro",
            start: "top top",
            end: "bottom+=100 top",
            pin: true,
            pinSpacing: false,
        });

        cards.forEach((card, id) => {
            const isLastCard = id === cards.length - 1;
            const cardInner = card.querySelector('.card-inner');

            if (!isLastCard) {
                ScrollTrigger.create({
                    trigger: card,
                    start: "top 35%",
                    end: "bottom 10%",
                    pin: true,
                    pinSpacing: false,
                });

                gsap.to(cardInner, {
                    y: `${(cards.length - 1 - id) * 12}vh`,
                    ease: "none",
                    scrollTrigger: {
                        trigger: card,
                        start: "top 35%",
                        end: "bottom 10%",
                        scrub: true,
                    }
                });
            }
        });

        return () => {
            ScrollTrigger.getAll().forEach(t => t.kill());
        };
    }, { scope: containerCard })

    return (
        <ReactLenis root>
            <div ref={containerCard} className='w-full h-full bg-yellow-400'>
                <section className='w-full h-[50vh] bg-red-500 intro'></section>

                <section className='w-full min-h-screen'>
                    {services.map((items, id) => (
                        <Card id={id} key={id} {...items} />
                    ))}
                </section>

                <section className='w-full h-[50vh] bg-indigo-500 outro'></section>
            </div>
        </ReactLenis>
    )
}

export default Service;
