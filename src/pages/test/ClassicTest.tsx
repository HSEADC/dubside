import React, { useEffect, useState } from 'react';
import classes from '@/pages/test/Test.module.scss';
import { ClassicTestData } from '@/shared/types/test';
import C_TestAnswers from '@/components/collections/C_TestAnswers/C_TestAnswers';
import M_TestResult from '@/components/molecules/M_TestResult/M_TestResult';

type Props = {
  test: ClassicTestData;
};

const ClassicTest = ({ test }: Props) => {
  const [count, setCount] = useState(0);
  const [checked, setChecked] = useState<boolean[]>([]);
  const [questionNumber, setQuestionNumber] = useState(0);
  const [isDone, setIsDone] = useState(false);

  const length = test.questions.length;

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

  if (!length) {
    return <div className={classes.testbox}>{'В этом тесте пока нет вопросов('}</div>;
  }

  return isDone ? (
    <M_TestResult count={count} length={length} />
  ) : (
    <div className={classes.testbox}>
      <span className={classes.span}>
        вопрос {questionNumber + 1} из {length}
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
  );
};

export default ClassicTest;
