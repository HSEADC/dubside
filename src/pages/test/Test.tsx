import Q_VideoBackground from '@/components/quarks/Q_VideoBackground/Q_VideoBackground';
import W_SectionElementsWrapper from '@/components/wrappers/W_SectionElementsWrapper/W_SectionElementsWrapper';
import React, { useEffect, useMemo } from 'react';
import { useParams } from 'react-router';
import classes from '@/pages/test/Test.module.scss';
import testsDataRaw from '@/assets/data/tests/tests.json';
import { isClassicTest, isMultipleTest, TestData, TestId } from '@/shared/types/test';
import ClassicTest from '@/pages/test/ClassicTest';
import MultipleTest from '@/pages/test/MultipleTest';

const isTestId = (value: string | undefined): value is TestId => {
  return !!value && value in testsDataRaw;
};

const Test = () => {
  const params = useParams();
  const test = useMemo<TestData | null>(() => {
    if (!isTestId(params.id)) return null;
    return testsDataRaw[params.id] as TestData;
  }, [params.id]);

  const videoLink = 'https://dunchek-test-bucket.s3-website.cloud.ru/dubside/videos/tests.mp4';

  useEffect(() => {
    const prev = document.body.style.overflowY;
    document.body.style.overflowY = 'hidden';
    return () => {
      document.body.style.overflowY = prev;
    };
  }, []);

  return (
    <section className={classes.wrapper}>
      <Q_VideoBackground source={videoLink} uppergrad={false} />
      <W_SectionElementsWrapper>
        {!test ? (
          <div className={classes.testbox}>{'Тест не найден('}</div>
        ) : isClassicTest(test) ? (
          <ClassicTest test={test} />
        ) : isMultipleTest(test) ? (
          <MultipleTest test={test} />
        ) : (
          <div className={classes.testbox}>{'Неизвестный тип теста('}</div>
        )}
      </W_SectionElementsWrapper>
    </section>
  );
};

export default Test;
