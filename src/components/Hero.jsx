import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React, { useEffect, useRef, useState } from "react";
import { heroVideo, smallHeroVideo } from "../utils";
import { ScrollTrigger } from "gsap/all";
gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const [videoSrc, setVideoSrc] = useState(
    window.innerWidth < 760 ? smallHeroVideo : heroVideo
  );
  const videoRef = useRef();

  // function to set the iphone15 video according to screen size
  const handleVideoSrcSet = () => {
    if (innerWidth < 760) {
      setVideoSrc(smallHeroVideo);
    } else {
      setVideoSrc(heroVideo);
    }
  };

  // useEffect hook to render handleVideoSet function on every screen change rendering
  useEffect(() => {
    window.addEventListener("resize", handleVideoSrcSet);
    return () => {
      window.removeEventListener("resize", handleVideoSrcSet);
    };
  }, []);

  useGSAP(() => {
    gsap.to("#transitionVideo", {
      scrollTrigger: {
        trigger: "#transitionVideo",
        toggleActions: "play pause reverse restart",
        start: "5% top",
      },
      onComplete: () => {
        videoRef.current.play();
      },
    });

    gsap.to("#hero", {
      opacity: 0.5,
      delay: 2,
    });

    gsap.to("#cta", {
      opacity: 1,
      delay: 2,
      y: -50,
    });
  }, []);

  return (
    <section className="w-full nav-height bg-black relative">
      <div className="h-5/6 w-full flex-col flex-center">
        <p id="hero" className="hero-title">
          iPhone 15 Pro
        </p>
        <div className="md:w-10/12 w-9/12">
          <video
            id="transitionVideo"
            className="pointer-events-none"
            autoPlay
            muted
            playsInline={true}
            key={videoSrc}
            ref={videoRef}
          >
            <source src={videoSrc} type="video/mp4" />
          </video>
        </div>
      </div>
      <div
        id="cta"
        className="flex flex-col items-center opacity-0 translate-y-20"
      >
        <a href="#highlights" className="btn">
          Buy
        </a>
        <p className="font-normal text-xl">From $199/month or $999</p>
      </div>
    </section>
  );
};

export default Hero;
