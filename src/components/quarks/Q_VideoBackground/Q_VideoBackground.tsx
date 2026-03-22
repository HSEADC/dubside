import React from 'react';
import classes from '@/components/quarks/Q_VideoBackground/Q_VideoBackground.module.scss';

interface Q_VideoBackgroundType {
  source: string;
  uppergrad: boolean;
}

const Q_VideoBackground = ({ source, uppergrad }: Q_VideoBackgroundType) => {
  return (
    <div className={classes.wrapper}>
      <video className={classes.vid} preload="metadata" autoPlay loop muted playsInline>
        <source src={source} type="video/mp4" />
      </video>
      <div className={classes.gradientdown}></div>
      <div className={uppergrad ? classes.gradientup : undefined}></div>
    </div>
  );
};

export default Q_VideoBackground;
