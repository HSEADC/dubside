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
          Медиа о&nbsp;зарубежном хип-хопе, рэпе и&nbsp;смежных жанрах, ориентированный на&nbsp;тех,
          кто не&nbsp;имеет четких представлений об&nbsp;этом музыкальном направлении и&nbsp;его
          культуре, но&nbsp;заинтересован в&nbsp;ознакомлении с&nbsp;современными процессами.
        </p>
        <p className={classes.p}>
          Наше медиа собрало всю актуальную хип-хоп индустрию в&nbsp;одном месте,
          и&nbsp;позаботилось, чтобы порог у&nbsp;этой двери стоял как можно ниже.
        </p>
        <p className={classes.p}>
          Красной нитью мы&nbsp;проведём вас от&nbsp;хайповых треков и&nbsp;попсы к&nbsp;тому, что
          за&nbsp;этим скрывается&nbsp;— многообразный, интереснейший мир хип-хоп культуры.
        </p>
      </W_SectionElementsWrapper>
    </div>
  );
};

export default About;
