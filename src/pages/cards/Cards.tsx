import React from 'react';
import W_SectionElementsWrapper from '@/components/wrappers/W_SectionElementsWrapper/W_SectionElementsWrapper';
import SO_HeroBlock from '@/components/super-organisms/SO_HeroBlock/SO_HeroBlock';
// import classes from '@/pages/cards/Cards.module.scss';

const Cards = () => {
  return (
    <div>
      <SO_HeroBlock />

      <section>
        <W_SectionElementsWrapper>
          <p>cards</p>
        </W_SectionElementsWrapper>
      </section>
    </div>
  );
};

export default Cards;
