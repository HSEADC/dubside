import React from 'react';
import W_SectionElementsWrapper from '@/components/wrappers/W_SectionElementsWrapper/W_SectionElementsWrapper';
import Q_VideoBackground from '@/components/quarks/Q_VideoBackground/Q_VideoBackground';
import { videosGuideMap } from '@/shared/constants/videoGuideMap';
import classes from '@/pages/cards/Cards.module.scss';
import M_FlipCard from '@/components/molecules/M_FlipCard/M_FlipCard';

const Cards = () => {
  const videoLink = videosGuideMap.cards;
  return (
    <div>
      <Q_VideoBackground source={videoLink} uppergrad={false} />
      <W_SectionElementsWrapper>
        <div className={classes.breakdiv}></div>

        <div className={classes.cardswrapper}>
          <M_FlipCard nickname="kanye" />
          <M_FlipCard nickname="drake" />
          <M_FlipCard nickname="kendrick" />

          <M_FlipCard nickname="eminem" />
          <M_FlipCard nickname="jayz" />
          <M_FlipCard nickname="nicki" />

          <M_FlipCard nickname="travis" />
          <M_FlipCard nickname="50cent" />
          <M_FlipCard nickname="carti" />

          <M_FlipCard nickname="future" />
          <M_FlipCard nickname="wayne" />
          <M_FlipCard nickname="jcole" />
        </div>
      </W_SectionElementsWrapper>
    </div>
  );
};

export default Cards;
