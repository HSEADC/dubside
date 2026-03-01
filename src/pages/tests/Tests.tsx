import Q_VideoBackground from '@/components/quarks/Q_VideoBackground/Q_VideoBackground';
import React from 'react';
import classes from '@/pages/tests/Tests.module.scss';
import W_SectionElementsWrapper from '@/components/wrappers/W_SectionElementsWrapper/W_SectionElementsWrapper';
import testInfo from '@/assets/data/tests/tests.json';
import A_Badge from '@/components/atoms/A_Badge/A_Badge';
import M_TestCard from '@/components/molecules/M_TestCard/M_TestCard';

const Tests = () => {
  const link = 'https://dunchek-test-bucket.s3-website.cloud.ru/dubside/videos/tests.mp4';

  return (
    <div>
      <Q_VideoBackground source={link} uppergrad={false} />

      <W_SectionElementsWrapper>
        <div className={classes.breakdiv}></div>
        <h1>Подготовили для тебя тесты!</h1>
        <p>
          Повеселись с простыми, или попробуй свои силы в более сложных. Главное — ответы на все
          вопросы можно найти у нас в материалах. Удачи!
        </p>

        <div className={classes.testswrapper}>
          <M_TestCard id="1" size="mid" />
          <M_TestCard id="1" size="mini" />
          <M_TestCard id="1" size="mini" />
          <M_TestCard id="1" size="mid" />
          <M_TestCard id="1" size="max" />
          <M_TestCard id="1" size="mini" />
          <M_TestCard id="1" size="mid" />
        </div>
      </W_SectionElementsWrapper>
    </div>
  );
};

export default Tests;
