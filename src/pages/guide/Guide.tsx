import Q_VideoBackground from '@/components/quarks/Q_VideoBackground/Q_VideoBackground';
import React from 'react';
import video from '@/assets/videos/Q_HeroVideo.mp4';

const Guide = () => {
  return (
    <section>
      <Q_VideoBackground source={video} />
      <div className="W_SectionElementsWrapper">
        <h1>lol</h1>
        <h2>h2 try</h2>
      </div>
    </section>
  );
};

export default Guide;
