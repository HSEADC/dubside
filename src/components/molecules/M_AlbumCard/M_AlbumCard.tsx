import React from 'react';
import classes from '@/components/molecules/M_AlbumCard/M_AlbumCard.module.scss';
import Q_Image from '@/components/quarks/Q_Image/Q_image';

interface Album {
  name: string;
  footer: string;
  img: string;
  link: string;
}

interface Props {
  album: Album;
}

const M_AlbumCard = ({ album }: Props) => {
  return (
    <a href={album.link} target="_blank" rel="noopener noreferrer">
      <div className={classes.album}>
        <Q_Image src={album.img} alt="album" />
        <div className={classes.grad}></div>
        <div className={classes.albumspans}>
          <span>{album.name}</span>
          <span className={classes.footer1}>{album.footer}</span>
        </div>
      </div>
    </a>
  );
};

export default M_AlbumCard;
