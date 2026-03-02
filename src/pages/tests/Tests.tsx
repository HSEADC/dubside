import Q_VideoBackground from '@/components/quarks/Q_VideoBackground/Q_VideoBackground';
import React, { useMemo, useState } from 'react';
import classes from '@/pages/tests/Tests.module.scss';
import W_SectionElementsWrapper from '@/components/wrappers/W_SectionElementsWrapper/W_SectionElementsWrapper';
import M_TestCard from '@/components/molecules/M_TestCard/M_TestCard';
import testsDataRaw from '@/assets/data/tests/tests.json';
import A_BadgeLikeButton from '@/components/atoms/A_BadgeLikeButton/A_BadgeLikeButton';
import calcTestCardSize from '@/shared/utils/calcTestCardSize';

type TestId = keyof typeof testsDataRaw;
type Hardness = 'normal' | 'hard' | 'easy';
type ActiveButton = 'all' | 'easy' | 'normal' | 'hard';

type TestData = {
  hardness: Hardness;
  timing: string;
  heading: string;
  img: string;
};

type TestWithId = TestData & { id: TestId };

const Tests = () => {
  const videoLink = 'https://dunchek-test-bucket.s3-website.cloud.ru/dubside/videos/tests.mp4';

  const testsEntries = useMemo(() => {
    const testsData = testsDataRaw as Record<TestId, TestData>;
    return Object.entries(testsData).map(([id, data]) => ({
      id: id as TestId,
      ...data
    }));
  }, []);

  const [activeButton, setActiveButton] = useState<ActiveButton>('all');

  const filterTests = (allTests: TestWithId[], filter: Hardness | 'all') => {
    if (filter === 'all') return allTests;
    return allTests.filter((t) => t.hardness === filter);
  };

  const selectTests = (filter: ActiveButton) => {
    setActiveButton(filter);
  };

  return (
    <div>
      <Q_VideoBackground source={videoLink} uppergrad={false} />

      <W_SectionElementsWrapper>
        <div className={classes.breakdiv}></div>
        <h1>Подготовили для тебя тесты!</h1>
        <p>
          Повеселись с простыми, или попробуй свои силы в более сложных. Главное — ответы на все
          вопросы можно найти у нас в материалах. Удачи!
        </p>

        <div className={classes.buttons}>
          <A_BadgeLikeButton disabled={activeButton !== 'all'} onClick={() => selectTests('all')}>
            All
          </A_BadgeLikeButton>
          <A_BadgeLikeButton
            color="green"
            disabled={activeButton !== 'easy'}
            onClick={() => selectTests('easy')}>
            Easy
          </A_BadgeLikeButton>
          <A_BadgeLikeButton
            color="blue"
            disabled={activeButton !== 'normal'}
            onClick={() => selectTests('normal')}>
            Normal
          </A_BadgeLikeButton>
          <A_BadgeLikeButton
            color="red"
            disabled={activeButton !== 'hard'}
            onClick={() => selectTests('hard')}>
            Hard
          </A_BadgeLikeButton>
        </div>

        <div className={classes.testswrapper}>
          {filterTests(testsEntries, activeButton).map((t, i) => {
            return <M_TestCard id={t.id} size={calcTestCardSize(i)} key={t.id}></M_TestCard>;
          })}
        </div>
      </W_SectionElementsWrapper>
    </div>
  );
};

export default Tests;
