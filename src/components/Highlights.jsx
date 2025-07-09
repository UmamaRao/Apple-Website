import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React from "react";
import { rightImg, watchImg } from "../utils";
import VideoCarousel from "./VideoCarousel";

const Highlights = () => {
  useGSAP(() => {
    gsap.to("#title", {
      y: 0,
      opacity: 1,
    });

    gsap.to(".link", {
      y: 0,
      opacity: 1,
      duration: 1,
      stagger: 0.25,
    });
  }, []);

  return (
    <section
      id="highlights"
      className="w-screen overflow-hidden common-padding h-full bg-zinc-900"
    >
      <div className="screen-max-width">
        <div className="mb-12 w-full justify-between md:flex items-end">
          <h1 id="title" className="section-heading">
            Get the Highlights.
          </h1>
          <div className="flex flex-wrap gap-5 items-end">
            <p className="link">
              Watch the film
              <img src={watchImg} alt="watch" className="ml-2" />
            </p>
            <p className="link">
              Watch the event
              <img src={rightImg} alt="right" className="ml-2" />
            </p>
          </div>
        </div>
        <VideoCarousel />
      </div>
    </section>
  );
};

export default Highlights;
