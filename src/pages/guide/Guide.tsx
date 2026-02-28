import React from 'react';
import W_SectionElementsWrapper from '@/components/wrappers/W_SectionElementsWrapper/W_SectionElementsWrapper';
import SO_HeroBlock from '@/components/super-organisms/SO_HeroBlock/SO_HeroBlock';
import SO_ArtistGuideBlock from '@/components/super-organisms/SO_ArtistGuideBlock/SO_ArtistGuideBlock';

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

      <SO_ArtistGuideBlock artist="kendrick" side="left" />
      <SO_ArtistGuideBlock artist="drake" side="right" />
    </div>
  );
};

export default Guide;
