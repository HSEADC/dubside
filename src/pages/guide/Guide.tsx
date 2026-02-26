import Q_VideoBackground from '@/components/quarks/Q_VideoBackground/Q_VideoBackground';
import React from 'react';
import video from '@/assets/videos/Q_HeroVideo.mp4';
import W_SectionElementsWrapper from '@/components/wrappers/W_SectionElementsWrapper/W_SectionElementsWrapper';

const Guide = () => {
  return (
    <section>
      <Q_VideoBackground source={video} />
      <W_SectionElementsWrapper>
        <h1>lol</h1>
        <h2>h2 try</h2>
      </W_SectionElementsWrapper>
    </section>
  );
};

export default Guide;
