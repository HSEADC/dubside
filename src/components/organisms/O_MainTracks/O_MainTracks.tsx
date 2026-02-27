import React from 'react';
import classes from '@/components/organisms/O_MainTracks/O_MainTracks.module.scss';

interface Track {
  name: string;
  footer: string;
}

interface Props {
  tracks: Track[];
}

const O_MainTracks = ({ tracks }: Props) => {
  return (
    <div className={classes.trackswrapper}>
      <h4>Ключевые треки</h4>
      <div className={classes.tracks}>
        {tracks.map((p: Track) => (
          <div className={classes.track}>
            <div>{p.name}</div>
            <div className={classes.footer1}>{p.footer}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default O_MainTracks;
