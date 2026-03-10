import Q_VideoBackground from '@/components/quarks/Q_VideoBackground/Q_VideoBackground';
import W_SectionElementsWrapper from '@/components/wrappers/W_SectionElementsWrapper/W_SectionElementsWrapper';
import React, { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router';
import classes from '@/pages/test/Test.module.scss';
import testsDataRaw from '@/assets/data/tests/tests.json';
import { TestData, TestId } from '@/shared/types/test';
import C_TestAnswers from '@/components/collections/C_TestAnswers/C_TestAnswers';
import M_TestResult from '@/components/molecules/M_TestResult/M_TestResult';

const isTestId = (value: string | undefined): value is TestId => {
  return !!value && value in testsDataRaw;
};

const Test = () => {
  const params = useParams();
  const test = useMemo<TestData | null>(() => {
    /* либо вернётся объект теста либо null, если id неверный*/
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

  const [count, setCount] = useState(0);
  const [checked, setChecked] = useState<boolean[]>([]);
  const [questionNumber, setQuestionNumber] = useState(0);
  const [isDone, setIsDone] = useState(false);

  const length = test?.questions.length ?? 0;

  useEffect(() => {
    setChecked([]);
  }, [questionNumber]);

  const changeQuestion = (toCount: number) => {
    setCount((prev) => prev + toCount);
    if (questionNumber + 1 === length) {
      setIsDone(true);
      return;
    }
    setQuestionNumber((prev) => prev + 1);
  };

  return (
    <section className={classes.wrapper}>
      <Q_VideoBackground source={videoLink} uppergrad={false} />
      <W_SectionElementsWrapper>
        {isDone ? (
          <M_TestResult count={count} length={length} />
        ) : test ? (
          <div className={classes.testbox}>
            <span className={classes.span}>
              вопрос {questionNumber} из {length}
            </span>

            <h3 className={classes.h3}>{test.questions[questionNumber].question}</h3>

            <C_TestAnswers
              test={test}
              questionNumber={questionNumber}
              checked={checked}
              setChecked={setChecked}
              changeQuestion={changeQuestion}
            />
          </div>
        ) : (
          <div className={classes.testbox}>{'Тест не найден('}</div>
        )}
      </W_SectionElementsWrapper>
    </section>
  );
};

export default Test;
