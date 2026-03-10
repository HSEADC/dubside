import React from 'react';
import classes from '@/components/organisms/O_ArticleSection/O_ArticleSection.module.scss';
import {
  ArticleBlockContent,
  SideArticleImg,
  ArticleParagraph,
  ArticleSide
} from '@/shared/types/articles';
import A_ImgLarge from '@/components/atoms/A_ImgLarge/A_ImgLarge';
import A_ImgSmall from '@/components/atoms/A_ImgSmall/A_ImgSmall';

type Props = {
  section: ArticleBlockContent;
  side: ArticleSide;
  index: string;
};

const O_ArticleSection = ({ section, side, index }: Props) => {
  let sideWrapper;
  if (side === 'left') {
    sideWrapper = classes.sideswrapper;
  } else if (side === 'right') {
    sideWrapper = `${classes.sideswrapper} ${classes.reverse}`;
  }
  return (
    <section className={classes.wrapper}>
      <div className={sideWrapper}>
        <div className={classes.pwrapper}>
          {section.heading !== '' ? (
            <h3 className={classes.h3} id={index}>
              {section.heading}
            </h3>
          ) : null}
          {!section.paragraphs ? <p>Элемент не найден</p> : <span></span>}
          {section.paragraphs?.map((el: ArticleParagraph) => {
            if (typeof el === 'string') {
              return <p className={classes.p}>{el}</p>;
            } else if (typeof el === 'object' && side === 'left') {
              return <A_ImgLarge source={el.big_img} footer={el.img_footer} />;
            } else if (typeof el === 'object' && side === 'right') {
              return null;
            } else {
              return <p>Элемент не найден</p>;
            }
          })}
        </div>

        <div className={classes.imgswrapper}>
          {section.side_imgs?.map((img: SideArticleImg | null) => {
            const isNull = typeof img.side_img === 'undefined';
            return isNull ? null : <A_ImgSmall source={img.side_img} footer={img.img_footer} />;
          })}
        </div>
      </div>
    </section>
  );
};

export default O_ArticleSection;
