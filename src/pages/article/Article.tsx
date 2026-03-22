import W_SectionElementsWrapper from '@/components/wrappers/W_SectionElementsWrapper/W_SectionElementsWrapper';
import classes from '@/pages/article/Article.module.scss';
import { Link, useParams } from 'react-router';
import { useEffect, useState, useMemo } from 'react';
import { getArticleContent } from '@/shared/api/articles';
import { ArticleContent } from '@/shared/types/articles';
import ArticlesDataRaw from '@/assets/data/articles/articlesInfo.json';
import { Article, ArticleBlockContent } from '@/shared/types/articles';
import O_ArticleSection from '@/components/organisms/O_ArticleSection/O_ArticleSection';
import { calcArticleSide } from '@/shared/utils/calcArticleSide';
import Q_ImageBackground from '@/components/quarks/Q_ImageBackground/Q_ImageBackground';

const Article = () => {
  const params = useParams();
  const slug = params.slug;

  const articlesData = useMemo(() => {
    return ArticlesDataRaw as Article[];
  }, []);

  const articleInfo: Article | null | undefined = articlesData.find(
    (value: Article) => value.slug === slug
  );
  if (typeof articleInfo === 'undefined') {
    console.log('Статья не найдена');
    throw new Error('Статья не найдена');
  }

  const [articleContent, setArticleContent] = useState<ArticleContent | null>(null);
  const contents = useMemo(() => {
    if (!articleContent) {
      console.log('Нет контента');
      return [];
    }
    return articleContent
      .map((section, index) => ({ id: String(index), heading: section.heading }))
      .filter((item) => item.heading !== '');
  }, [articleContent]);

  useEffect(() => {
    const controller = new AbortController();
    getArticleContent(articleInfo.contentLink, controller.signal).then(setArticleContent);

    return () => controller.abort();
  }, [articleInfo.contentLink]);

  const imgLink = articleInfo.img;

  return (
    <div>
      <Q_ImageBackground source={imgLink} uppergrad={false} />
      <W_SectionElementsWrapper>
        <div className={classes.breakdiv}></div>
        <h2>{articleInfo.title}</h2>
        <div className={classes.labels}>
          <span className={classes.label}>{articleInfo.tags.join(' | ')}</span>
          <span className={classes.label}>{articleInfo.date}</span>
        </div>

        <div className={classes.contents}>
          <span className={classes.label}>Содержание</span>
          {contents.map(({ id, heading }) => (
            <Link key={id} to={`#${id}`}>
              {heading}
            </Link>
          ))}
        </div>

        {articleContent?.map((section: ArticleBlockContent, i: number) => {
          return (
            <O_ArticleSection
              key={String(i)}
              section={section}
              side={calcArticleSide(i)}
              index={String(i)}
            />
          );
        })}
      </W_SectionElementsWrapper>
    </div>
  );
};

export default Article;
