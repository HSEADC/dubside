import Q_VideoBackground from '@/components/quarks/Q_VideoBackground/Q_VideoBackground';
import W_SectionElementsWrapper from '@/components/wrappers/W_SectionElementsWrapper/W_SectionElementsWrapper';
import { videosGuideMap } from '@/shared/constants/videoGuideMap';
import React from 'react';
import classes from '@/pages/articles/Articles.module.scss';
import A_Button from '@/components/atoms/A_Button/A_Button';
import M_Input from '@/components/molecules/M_Input/M_Input';
import M_FlipCard from '@/components/molecules/M_FlipCard/M_FlipCard';

const Articles = () => {
  const videoLink = videosGuideMap.hero;

  return (
    <div>
      <Q_VideoBackground source={videoLink} uppergrad={false} />
      <W_SectionElementsWrapper>
        <div className={classes.breakdiv}></div>

        <M_Input placeholder={'бла бsdvsdvла'} />

        {/* <div className={classes.inputwrapp}>
          <input type="text" className={classes.input} placeholder="впишите слова для поиска" />
        </div> */}

        <div className={classes.buttonswrap}>
          <A_Button isActive={false}>все</A_Button>
          <A_Button isActive={false}>статьи</A_Button>
          <A_Button isActive={false}>артисты</A_Button>
          <A_Button isActive={false}>карточки</A_Button>
        </div>

        <div className={classes.articleswrapper}>
          <div className={classes.article}></div>
          <M_FlipCard nickname="kanye" />
        </div>
      </W_SectionElementsWrapper>
    </div>
  );
};

export default Articles;
