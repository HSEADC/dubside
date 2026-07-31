import React from 'react';
import classes from '@/components/quarks/Q_ImageBackground/Q_ImageBackground.module.scss';

interface Q_ImageBackground {
  source: string;
  uppergrad: boolean;
}

const Q_ImageBackground = ({ source, uppergrad }: Q_ImageBackground) => {
  return (
    <div className={classes.wrapper}>
      <img
        src={source}
        className={classes.vid}
        alt=""
        loading="eager"
        decoding="async"
        fetchPriority="high"
      />
      <div className={classes.gradientdown}></div>
      {uppergrad ? <div className={classes.gradientup}></div> : null}
    </div>
  );
};

export default Q_ImageBackground;
