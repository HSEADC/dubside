import React from 'react';
import classes from '@/components/organisms/O_MainTracks/O_MainTracks.module.scss';
import M_Track from '@/components/molecules/M_Track/M_Track';

interface Track {
  name: string;
  footer: string;
  img: string;
  link: string;
}

interface Props {
  tracks: Track[];
}

const O_MainTracks = ({ tracks }: Props) => {
  return (
    <div className={classes.trackswrapper}>
      <h4>Ключевые треки</h4>
      <div className={classes.tracks}>
        {tracks.map((p: Track, i: number) => (
          <M_Track key={i} name={p.name} footer={p.footer} img={p.img} link={p.link} />
        ))}
      </div>
    </div>
  );
};

export default O_MainTracks;
