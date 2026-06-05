import React from 'react';
import Q_VideoBackground from '@/components/quarks/Q_VideoBackground/Q_VideoBackground';
import W_SectionElementsWrapper from '@/components/wrappers/W_SectionElementsWrapper/W_SectionElementsWrapper';
import { videosGuideMap } from '@/shared/constants/videoGuideMap';
import classes from '@/pages/styleguide/Styleguide.module.scss';

const videoLink = videosGuideMap.styleguide;

const Styleguide = () => {
  return (
    <div>
      <Q_VideoBackground source={videoLink} uppergrad={false} />
      <W_SectionElementsWrapper>
        <div className={classes.breakdiv}></div>
        <h1 className={classes.title}>Styleguide test page</h1>
      </W_SectionElementsWrapper>
    </div>
  );
};

export default Styleguide;
