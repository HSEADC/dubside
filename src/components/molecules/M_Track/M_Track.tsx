import classes from '@/components/molecules/M_Track/M_Track.module.scss';
import React from 'react';
import { Track } from '@/shared/types/cards';
import Q_Image from '@/components/quarks/Q_Image/Q_image';
import TrackColorsRaw from '@/assets/data/trackColors/trackColors.json';

const trackColors = TrackColorsRaw as Record<string, string>;
const defaultColor = '100 100 100';

const M_Track = ({ name, footer, img, link }: Track) => {
  const color = trackColors[img] ?? defaultColor;

  type CSSVars = React.CSSProperties & {
    ['--accent-rgb']?: string;
  };

  return (
    <a href={link} className={classes.track} target="_blank" rel="noopener noreferrer">
      <div className={classes.grad} style={{ ['--accent-rgb']: color } as CSSVars}></div>
      <Q_Image
        src={img}
        className={classes.img}
        wrapperClasses={classes.img}
      />
      <div className={classes.trackinfo}>
        <div className={classes.title}>{name}</div>
        <div className={classes.footer1}>{footer}</div>
      </div>
    </a>
  );
};

export default M_Track;
