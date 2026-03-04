import React from 'react';

import classes from '@/components/molecules/M_ArticleCard/M_ArticleCard.module.scss';
import A_Badge from '@/components/atoms/A_Badge/A_Badge';
import ArticlesDataRaw from '@/assets/data/articles/articlesInfo.json';
import { useNavigate } from 'react-router';
import Article from '@/shared/types/articles';

const articlesData: Article[] = ArticlesDataRaw;

interface Props {
  id: string | number;
  size: 'mini' | 'mid' | 'max';
}

const M_ArticleCard = ({ id, size }: Props) => {
  const index = typeof id === 'number' ? id : Number(id);
  const articleData = articlesData[index];
  const slug = articleData.slug;

  let wrapper;
  let grad;
  let tagsDown: boolean;
  if (size === 'mini') {
    wrapper = classes.mini;
    grad = classes.gradtop;
    tagsDown = true;
  } else if (size === 'max') {
    wrapper = classes.max;
    grad = classes.gradright;
    tagsDown = false;
  } else {
    wrapper = classes.mid;
    grad = classes.gradright;
    tagsDown = false;
  }

  const navigate = useNavigate();

  return (
    <div className={wrapper} onClick={() => navigate(`/articles/${slug}`)}>
      <img className={classes.img} src={articleData.img} alt="img" />
      <div className={grad}></div>

      <div className={classes.upperdiv}>
        {!tagsDown ? (
          <div className={classes.label}>{articleData.tags.join(' | ')}</div>
        ) : (
          <div></div>
        )}

        <div className={classes.buttons}>
          <A_Badge>{articleData.timing}</A_Badge>
        </div>
      </div>

      <div className={classes.downdiv}>
        {!tagsDown ? (
          <div></div>
        ) : (
          <div className={classes.label}>{articleData.tags.join(' | ')}</div>
        )}
        <h4>{articleData.title}</h4>
        <p className={classes.p}>{articleData.paragraph}</p>
      </div>
    </div>
  );
};

export default M_ArticleCard;
