import O_CardSlider from '@/components/organisms/O_CardSlider/O_CardSlider';
import Q_VideoBackground from '@/components/quarks/Q_VideoBackground/Q_VideoBackground';
import React from 'react';
import classes from '@/components/super-organisms/SO_HeroBlock/SO_HeroBlock.module.scss';
import { videosGuideMap } from '@/shared/constants/videoGuideMap';

const SO_HeroBlock = () => {
  const video = videosGuideMap.hero;
  return (
    <section className={classes.wrapper}>
      <Q_VideoBackground source={video} uppergrad={false} />
      <O_CardSlider className={classes.slider} />
      <h1 className={classes.h1}>dubside</h1>
      <p className={classes.p}>
        медиа-платформа для изучения современной западной хип-хоп культуры и&nbsp;смежных с ней
        жанров
      </p>
      <img src={`${__PUBLIC_PATH__}icons/icon.svg`} className={classes.icon} />
    </section>
  );
};

export default SO_HeroBlock;
