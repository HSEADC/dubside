import Q_VideoBackground from '@/components/quarks/Q_VideoBackground/Q_VideoBackground';
import W_SectionElementsWrapper from '@/components/wrappers/W_SectionElementsWrapper/W_SectionElementsWrapper';
import { videosGuideMap } from '@/shared/constants/videoGuideMap';
import React, { useMemo } from 'react';
import classes from '@/pages/articles/Articles.module.scss';
import A_Button from '@/components/atoms/A_Button/A_Button';
import M_Input from '@/components/molecules/M_Input/M_Input';
import ArticlesDataRaw from '@/assets/data/articles/articlesInfo.json';
import Article from '@/shared/types/articles';
import M_ArticleCard from '@/components/molecules/M_ArticleCard/M_ArticleCard';
import calcTestCardSize from '@/shared/utils/calcTestCardSize';

const Articles = () => {
  const videoLink = videosGuideMap.hero;
  const articlesData = useMemo(() => {
    return ArticlesDataRaw as Article[];
  }, []);

  return (
    <div>
      <Q_VideoBackground source={videoLink} uppergrad={false} />
      <W_SectionElementsWrapper>
        <div className={classes.breakdiv}></div>

        <M_Input placeholder={'впишите слова для поиска'} />

        <div className={classes.buttonswrap}>
          <A_Button isActive={false}>бронкс</A_Button>
          <A_Button isActive={false}>история</A_Button>
          <A_Button isActive={false}>артист</A_Button>
          <A_Button isActive={false}>раннее</A_Button>
        </div>

        <div className={classes.articleswrapper}>
          {articlesData.map((a, i) => {
            return <M_ArticleCard id={a.id} size={calcTestCardSize(i)} />;
          })}
        </div>
      </W_SectionElementsWrapper>
    </div>
  );
};

export default Articles;
