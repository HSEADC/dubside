import Q_VideoBackground from '@/components/quarks/Q_VideoBackground/Q_VideoBackground';
import W_SectionElementsWrapper from '@/components/wrappers/W_SectionElementsWrapper/W_SectionElementsWrapper';
import { videosGuideMap } from '@/shared/constants/videoGuideMap';
import React from 'react';
import classes from '@/components/super-organisms/SO_ArtistGuideBlock/SO_ArtistGuideBlock.module.scss';
import artistGuideBlockInfo from '@/assets/data/guideArtistInfo/guideArtistInfo.json';
import O_MainTracks from '@/components/organisms/O_MainTracks/O_MainTracks';
import M_AlbumCard from '@/components/molecules/M_AlbumCard/M_AlbumCard';

interface Props {
  artist: ArtistKey;
  side: 'right' | 'left';
}

interface Track {
  name: string;
  footer: string;
  img: string;
  link: string;
}

type Album = Track;

type ArtistKey = keyof typeof artistGuideBlockInfo;

interface ArtistInfoTypes {
  name: string;
  paragraphs_top: string[];
  paragraphs_bottom: string[];
  tracks: Track[];
  album: Album;
}

// type ArtistGuideBlockInfoType = Record<string, ArtistInfoTypes>;

const SO_ArtistGuideBlock = ({ artist, side }: Props) => {
  const artistInfo: ArtistInfoTypes = artistGuideBlockInfo[artist];

  const video = videosGuideMap[artist];

  const name = artistInfo.name;
  const paragraphs_top = artistInfo.paragraphs_top;
  const paragraphs_bottom = artistInfo.paragraphs_bottom;
  const tracks = artistInfo.tracks;
  const album = artistInfo.album;

  const isRight = side === 'right';

  return (
    <section className={classes.wrapper} id={artist}>
      <Q_VideoBackground source={video} uppergrad={true}></Q_VideoBackground>

      <W_SectionElementsWrapper>
        <div className={isRight ? classes.right : undefined}>
          <div className={classes.breakdiv}></div>
          <h1 className={classes.h1}>{name}</h1>
          {paragraphs_top.map((p: string, i: number) => (
            <p key={i} className={classes.p}>
              {p}
            </p>
          ))}
        </div>

        <O_MainTracks tracks={tracks} />

        {isRight ? (
          <div className={classes.bottompwrap}>
            <M_AlbumCard album={album} />
            <div>
              {paragraphs_bottom.map((p: string, i: number) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
        ) : (
          <div className={classes.bottompwrap}>
            <div>
              {paragraphs_bottom.map((p: string, i: number) => (
                <p key={i}>{p}</p>
              ))}
            </div>
            <M_AlbumCard album={album} />
          </div>
        )}
      </W_SectionElementsWrapper>
    </section>
  );
};

export default SO_ArtistGuideBlock;
