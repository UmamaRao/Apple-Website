import React, { useEffect, useRef, useState } from 'react'
import Highlights from './Highlights'
import { hightlightsSlides } from '../constants'
import gsap from 'gsap'
import { pauseImg, playImg, replayImg } from '../utils'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/all'

gsap.registerPlugin(ScrollTrigger)
const VideoCarousel = () => {
  const videoRef = useRef([])
  const videoSpanRef = useRef([])
  const videoDivRef = useRef([])

  const [video, setVideo] = useState({
    isEnd: false,
    isplaying: false,
    isLastVideo: false,
    startPlay: false,
    videoId: 0,
  })

  const [loadedData, setLoadedData] = useState([]);

  const { isEnd, isplaying, startPlay, isLastVideo, videoId } = video;

  useGSAP(() => {
    gsap.to('#slider', {
      transform: `translateX(${-100 * videoId}%)`,
      duration: 2,
      ease: 'power2.inOut',
    })

    gsap.to('#video', {
      scrollTrigger: {
        trigger: '#video',
        toggleActions: 'restart none none none'
      },
      onComplete: () => {
        setVideo((pre) => ({
          ...pre,
          startPlay: true,
          isplaying: true,
        }))
      }
    })
  }, [isEnd, videoId])

  useEffect(() => {
    if (loadedData.length > 3) {
      if (!isplaying) {
        videoRef.current[videoId].pause();
      } else {
        startPlay && videoRef.current[videoId].play();
      }
    }

  }, [startPlay, videoId, isplaying, loadedData])

  const handleLoadedMetaData = (i, e) => setLoadedData((pre) => [...pre, e])

  useEffect(() => {
    let currentProgress = 0;
    let span = videoSpanRef.current;

    if (span[videoId]) {
      // animate the progress of the vid
      let anim = gsap.to(span[videoId], {
        onUpdate: () => {
          const progress = Math.ceil(anim.progress() * 100)

          if (progress != currentProgress) {
            currentProgress = progress
          }

          gsap.to(videoDivRef.current[videoId], {
            width: window.innerWidth < 760
              ? '10vw'
              : window.innerWidth < 1200
                ? '10vw'
                : '4vw'
          })

          gsap.to(span[videoId], {
            width: `${currentProgress}%`,
            backgroundColor: 'white'
          })

        },
        onComplete: () => {
          if (isplaying) {
            gsap.to(videoDivRef.current[videoId], {
              width: '12px'
            })
            gsap.to(span[videoId], {
              backgroundColor: '#afafaf'
            })
          }
        }
      })

      if (videoId === 0) {
        anim.restart();
      }

      const animUpdate = () => {
        if (videoRef.current && videoRef.current[videoId]) {
        anim.progress(videoRef.current[videoId].currentTime / hightlightsSlides[videoId].videoDuration)
      }}

      if (isplaying) {
        gsap.ticker.add(animUpdate);
      } else {
        gsap.ticker.remove(animUpdate)
      }
    }

  }, [videoId, startPlay])

  const handleProcess = (type, i) => {
    switch (type) {
      case 'video-end':
        setVideo((pre) => ({ ...pre, isEnd: true, videoId: i + 1 }))
        break;
      case 'video-last':
        setVideo((pre) => ({ ...pre, isLastVideo: false, videoId: 0 }))
        break;
      case 'video-reset':
        setVideo((pre) => ({ ...pre, isLastVideo: false, videoId: 0 }))
        break;
      case 'play':
        setVideo((pre) => ({ ...pre, isplaying: !pre.isplaying }))
        break;
      case 'pause':
        setVideo((pre) => ({ ...pre, isplaying: !pre.isplaying }))
        break;

      default:
        break;
    }
  }
  return (
    <>
      <div className='flex items-center'>
        {hightlightsSlides.map((list, i) => (
          <div key={list.id} id='slider' className='sm:pr-20 pr-10'>
            <div className='video-carousel_container'>
              <div className='w-full h-full bg-black rounded-3xl overflow-hidden flex-center'>
                <video id='video' playsInline={true} preload='auto' muted
                className={`${list.id === 2 && 'translate-x-44'} pointer-events-none`}
                  ref={(el) => (videoRef.current[i] = el)}
                  onEnded={() =>
                    i !== 3 ? handleProcess('video-end', i) : handleProcess('video-last')}
                  onPlay={() => {
                    setVideo((prevVideo) => ({
                      ...prevVideo, isplaying: true
                    }))
                  }}
                  onLoadedMetadata={(e) => handleLoadedMetaData(i, e)}
                >
                  <source src={list.video} type='video/mp4' />
                </video>
              </div>
              <div className='absolute top-12 left-[5%] z-10'>
                {list.textLists.map((text) => (
                  <p key={text} className='md:text-2xl text-xl font-medium'>{text}</p>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className='relative flex-center mt-10'>
        <div className='flex-center gap-2 py-5 px-7 bg-gray-900 backdrop-blur rounded-2xl'>
          {videoRef.current.map((_, i) => (
            <span
              key={i}
              ref={(el) => (videoDivRef.current[i] = el)}
              className='mx-2 w-3 h-3 rounded-full relative cursor-pointer bg-gray-500'
            >
              <span
                ref={(el) => (videoSpanRef.current[i] = el)}
                className='absolute w-full h-full rounded-full'></span>
            </span>
          ))}
        </div>

        <button className='control-btn'>
          <img src={isLastVideo ? replayImg :
            !isplaying ? playImg : pauseImg}
            alt={isLastVideo ? replayImg :
              !isplaying ? playImg : pauseImg}
            onClick={isLastVideo
              ? () => handleProcess('video-reset')
              : !isplaying
                ? () => handleProcess('play')
                : () => handleProcess('pause')}
          />
        </button>
      </div>
    </>
  )
}

export default VideoCarousel
