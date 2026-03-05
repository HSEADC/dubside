import W_SectionElementsWrapper from '@/components/wrappers/W_SectionElementsWrapper/W_SectionElementsWrapper';
import { videosGuideMap } from '@/shared/constants/videoGuideMap';
import React from 'react';
import classes from '@/pages/about/About.module.scss';
import Q_VideoBackground from '@/components/quarks/Q_VideoBackground/Q_VideoBackground';

const videoLink = videosGuideMap.about;

const About = () => {
  return (
    <div>
      <Q_VideoBackground source={videoLink} uppergrad={false} />
      <W_SectionElementsWrapper>
        <div className={classes.breakdiv}></div>
        <h1>dubside</h1>
        <p className={classes.p}>
          медиа о зарубежном хип-хопе, рэпе и смежных жанрах, ориентированный на тех, кто не имеет
          четких представлений об этом музыкальном направлении и его культуре, но заинтересован в
          ознакомлении с современными процессами.
        </p>
        <p className={classes.p}>
          Наше медиа собрало всю актуальную хип-хоп индустрию в одном месте, и позаботилось, чтобы
          порог у этой двери стоял как можно ниже.
        </p>
        <p className={classes.p}>
          Красной нитью мы проведём вас от хайповых треков и попсы к тому, что за этим скрывается —
          многообразный, интереснейший мир хип-хоп культуры.
        </p>
      </W_SectionElementsWrapper>
    </div>
  );
};

export default About;
