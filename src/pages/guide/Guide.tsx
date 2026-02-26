import Q_VideoBackground from '@/components/quarks/Q_VideoBackground/Q_VideoBackground';
import React from 'react';
import video from '@/assets/videos/Q_HeroVideo.mp4';
import W_SectionElementsWrapper from '@/components/wrappers/W_SectionElementsWrapper/W_SectionElementsWrapper';
import M_FlipCard from '@/components/molecules/M_FlipCard/M_FlipCard';

const Guide = () => {
  return (
    <div>
      <section className="SO_HeroBlock">
        <Q_VideoBackground source={video} />
        <M_FlipCard nickname="kendrick" />
      </section>

      <section>
        <W_SectionElementsWrapper>
          <h1>lol</h1>
          <h2>h2 try</h2>
          <h2>h2 try</h2>
          <h2>h2 try</h2>
          <h2>h2 try</h2>
        </W_SectionElementsWrapper>
      </section>
    </div>
  );
};

export default Guide;
