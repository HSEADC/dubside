import React, { useEffect, useRef, useState } from 'react';
import classes from '@/components/quarks/Q_VideoBackground/Q_VideoBackground.module.scss';

interface Q_VideoBackgroundType {
  source: string;
  uppergrad: boolean;
  poster?: string;
  rootMargin?: string;
}

const Q_VideoBackground = ({
  source,
  uppergrad,
  poster,
  rootMargin = '300px 0px'
}: Q_VideoBackgroundType) => {
  const wrapperRef = useRef<HTMLDivElement | null>(null); // ссылка на внешний <div>, за которым следит IntersectionObserver
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    if (!('IntersectionObserver' in window)) {
      setIsActive(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsActive(entry.isIntersecting);
      },
      {
        rootMargin,
        threshold: 0.01
      }
    );

    observer.observe(wrapper);

    return () => observer.disconnect();
  }, [rootMargin]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (!isActive) {
      video.pause();
      video.load();
      return;
    }

    video.load();
    video.play().catch(() => {
      // Автоплей может быть заблочен браузером, будет виден постер
    });
  }, [isActive, source]);

  return (
    <div className={classes.wrapper} ref={wrapperRef}>
      <video
        ref={videoRef}
        className={classes.vid}
        preload="none"
        loop
        muted
        playsInline
        poster={poster}
        aria-hidden="true">
        {isActive ? <source src={source} type="video/mp4" /> : null}
      </video>
      <div className={classes.gradientdown}></div>
      {uppergrad ? <div className={classes.gradientup}></div> : null}
    </div>
  );
};

export default Q_VideoBackground;
