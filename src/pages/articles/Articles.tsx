import Q_VideoBackground from '@/components/quarks/Q_VideoBackground/Q_VideoBackground';
import W_SectionElementsWrapper from '@/components/wrappers/W_SectionElementsWrapper/W_SectionElementsWrapper';
import { videosGuideMap } from '@/shared/constants/videoGuideMap';
import React, { useMemo, useState } from 'react';
import classes from '@/pages/articles/Articles.module.scss';
import A_Button from '@/components/atoms/A_Button/A_Button';
import M_Input from '@/components/molecules/M_Input/M_Input';
import ArticlesDataRaw from '@/assets/data/articles/articlesInfo.json';
import { Article } from '@/shared/types/articles';
import M_ArticleCard from '@/components/molecules/M_ArticleCard/M_ArticleCard';
import calcTestCardSize from '@/shared/utils/calcTestCardSize';
import { filterArticles } from '@/shared/utils/filterArticles';

const tags = ['звук', 'история', 'техническое', 'артист'];
const articlesData = ArticlesDataRaw as Article[];
const videoLink = videosGuideMap.articles;

const Articles = () => {
  const [activeTags, setActiveTags] = useState<string[]>([]);
  const [query, setQuery] = useState<string>('');

  const filteredArticles = useMemo(() => {
    return filterArticles(articlesData, activeTags, query);
  }, [activeTags, query]);

  const toggleTag = (tag: string) =>
    setActiveTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]));

  const chooseAll = () => setActiveTags([]);
  const isAll = activeTags.length === 0;

  return (
    <div>
      <Q_VideoBackground source={videoLink} uppergrad={false} />
      <W_SectionElementsWrapper>
        <div className={classes.breakdiv}></div>

        <M_Input
          placeholder={'впишите слова для поиска'}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <div className={classes.buttonswrap}>
          <A_Button isActive={isAll} onClick={chooseAll} aria-pressed={isAll} type="button">
            все
          </A_Button>
          {tags.map((t) => {
            return (
              <A_Button
                type="button"
                aria-pressed={activeTags.includes(t)}
                key={t}
                name={t}
                isActive={activeTags.includes(t)}
                onClick={() => toggleTag(t)}>
                {t}
              </A_Button>
            );
          })}
        </div>

        <div className={classes.articleswrapper}>
          {filteredArticles.map((a, i) => {
            return <M_ArticleCard key={i} id={a.id} size={calcTestCardSize(i)} />;
          })}
        </div>
      </W_SectionElementsWrapper>
    </div>
  );
};

export default Articles;
