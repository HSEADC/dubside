import classes from '@/components/molecules/M_Track/M_Track.module.scss';
import React from 'react';

interface Track {
  name: string;
  footer: string;
  img: string;
  link: string;
}

const M_Track = ({ name, footer, img, link }: Track) => {
  return (
    <a href={link} className={classes.track} target="_blank" rel="noopener noreferrer">
      <img src={img} className={classes.img}></img>
      <div className={classes.trackinfo}>
        <div>{name}</div>
        <div className={classes.footer1}>{footer}</div>
      </div>
    </a>
  );
};

export default M_Track;
