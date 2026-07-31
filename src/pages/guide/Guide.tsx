import React, { useEffect, useRef, useState } from 'react';
import W_SectionElementsWrapper from '@/components/wrappers/W_SectionElementsWrapper/W_SectionElementsWrapper';
import SO_HeroBlock from '@/components/super-organisms/SO_HeroBlock/SO_HeroBlock';
import SO_ArtistGuideBlock from '@/components/super-organisms/SO_ArtistGuideBlock/SO_ArtistGuideBlock';
import classes from '@/pages/guide/Guide.module.scss';

const artistBlocks = [
  { artist: 'kendrick', side: 'left' },
  { artist: 'drake', side: 'right' },
  { artist: 'kanye', side: 'left' },
  { artist: 'jayz', side: 'right' },
  { artist: 'eminem', side: 'left' },
  { artist: 'nicki', side: 'right' },
  { artist: 'wayne', side: 'left' },
  { artist: '50cent', side: 'right' },
  { artist: 'travis', side: 'left' },
  { artist: 'jcole', side: 'right' },
  { artist: 'future', side: 'left' },
  { artist: 'carti', side: 'right' }
] as const;

type ArtistBlock = (typeof artistBlocks)[number];
type Artist = ArtistBlock['artist'];
type ArtistSide = ArtistBlock['side'];

type LazyArtistGuideBlockProps = {
  artist: Artist;
  side: ArtistSide;
};

const LazyArtistGuideBlock = ({ artist, side }: LazyArtistGuideBlockProps) => {
  const placeholderRef = useRef<HTMLElement | null>(null);
  const [shouldRender, setShouldRender] = useState(() => typeof window === 'undefined');

  useEffect(() => {
    const placeholder = placeholderRef.current;
    if (!placeholder || shouldRender) return;

    if (!('IntersectionObserver' in window)) {
      setShouldRender(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        setShouldRender(true);
        observer.disconnect();
      },
      {
        rootMargin: '900px 0px',
        threshold: 0.01
      }
    );

    observer.observe(placeholder);

    return () => observer.disconnect();
  }, [shouldRender]);

  if (shouldRender) {
    return <SO_ArtistGuideBlock artist={artist} side={side} />;
  }

  return <section id={artist} ref={placeholderRef} className={classes.artistPlaceholder} />;
};

const Guide = () => {
  return (
    <div>
      <SO_HeroBlock />

      <section>
        <W_SectionElementsWrapper>
          <p>
            Кто те люди, которых слушает и&nbsp;обсуждает твоё окружение? Что за&nbsp;расфорщенные
            зарубежные песни играют вокруг?
          </p>
          <p>
            Если совсем не&nbsp;знаешь с&nbsp;чего начинать вкатываться, то&nbsp;прочитай наш велком
            гайд.
          </p>
          <p>
            В этом гайде мы собрали лучших хип-хоперов и&nbsp;их&nbsp;ключевые треки. Можешь сразу
            прочитать весь гайд или постепенно входить в&nbsp;мир хип-хопа, возвращаясь сюда.
          </p>
        </W_SectionElementsWrapper>
      </section>

      {artistBlocks.map((block) => (
        <LazyArtistGuideBlock key={block.artist} artist={block.artist} side={block.side} />
      ))}
    </div>
  );
};

export default Guide;
