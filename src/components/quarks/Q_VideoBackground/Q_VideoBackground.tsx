import React from 'react';
// import effect from '@/assets/images/Q_HeroEffect.png';
import classes from '@/components/quarks/Q_VideoBackground/Q_VideoBackground.module.scss';

interface Q_VideoBackgroundType {
  source: string;
}

const Q_VideoBackground = (params: Q_VideoBackgroundType) => {
  return (
    <div className={classes.wrapper}>
      <video className={classes.vid} autoPlay loop muted playsInline preload="auto">
        <source src={params.source} type="video/mp4" />
      </video>
      <div className={classes.gradient}></div>
    </div>
  );
};

export default Q_VideoBackground;
