import React from 'react';
import classes from '@/components/molecules/M_AlbumCard/M_AlbumCard.module.scss';

interface Album {
  name: string;
  footer: string;
}

interface Props {
  source: string;
  album: Album;
}

const M_AlbumCard = ({ source, album }: Props) => {
  return (
    <div className={classes.album}>
      <img src={source} alt="album" />
      <div className={classes.grad}></div>
      <div className={classes.albumspans}>
        <span>{album.name}</span>
        <span className={classes.footer1}>{album.footer}</span>
      </div>
    </div>
  );
};

export default M_AlbumCard;
