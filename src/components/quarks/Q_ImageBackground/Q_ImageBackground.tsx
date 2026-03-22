import React from 'react';
import classes from '@/components/quarks/Q_ImageBackground/Q_ImageBackground.module.scss';

interface Q_ImageBackground {
  source: string;
  uppergrad: boolean;
}

const Q_ImageBackground = ({ source, uppergrad }: Q_ImageBackground) => {
  return (
    <div className={classes.wrapper}>
      <img src={source} className={classes.vid} />
      <div className={classes.gradientdown}></div>
      <div className={uppergrad ? classes.gradientup : undefined}></div>
    </div>
  );
};

export default Q_ImageBackground;
