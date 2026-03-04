import Q_VideoBackground from '@/components/quarks/Q_VideoBackground/Q_VideoBackground';
import W_SectionElementsWrapper from '@/components/wrappers/W_SectionElementsWrapper/W_SectionElementsWrapper';
import { videosGuideMap } from '@/shared/constants/videoGuideMap';
// import React, { useMemo } from 'react';
import classes from '@/pages/articles/Articles.module.scss';
import { useParams } from 'react-router';
import { useEffect, useState, useMemo } from 'react';
import { getArticleContent } from '@/shared/api/articles';
import { ArticleContent } from '@/shared/types/articles';
import ArticlesDataRaw from '@/assets/data/articles/articlesInfo.json';
// import A_Button from '@/components/atoms/A_Button/A_Button';
// import M_Input from '@/components/molecules/M_Input/M_Input';
// import ArticlesDataRaw from '@/assets/data/articles/articlesInfo.json';
import { Article } from '@/shared/types/articles';
// import M_ArticleCard from '@/components/molecules/M_ArticleCard/M_ArticleCard';
// import calcTestCardSize from '@/shared/utils/calcTestCardSize';

const Article = () => {
  const videoLink = videosGuideMap.hero;

  const params = useParams();
  const slug = params.slug;

  const articlesData = useMemo(() => {
    return ArticlesDataRaw as Article[];
  }, []);

  const articleInfo: Article | undefined = articlesData.find(
    (value: Article) => value.slug === slug
  );
  if (typeof articleInfo === 'undefined') throw new Error('Статья не найдена');

  const [articleContent, setArticleContent] = useState<ArticleContent | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    getArticleContent(
      'https://dunchek-test-bucket.s3-website.cloud.ru/dubside/articles/data/flow.json',
      controller.signal
    ).then(setArticleContent);

    return () => controller.abort();
  }, []);

  console.log(articleContent, articleInfo);

  return (
    <div>
      <Q_VideoBackground source={videoLink} uppergrad={false} />
      <W_SectionElementsWrapper>
        <div className={classes.breakdiv}></div>

        <div>article {slug}</div>
      </W_SectionElementsWrapper>
    </div>
  );
};

export default Article;
