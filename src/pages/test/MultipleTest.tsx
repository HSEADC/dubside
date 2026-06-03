import React, { useMemo, useState } from 'react';
import classes from '@/pages/test/MultipleTest.module.scss';
import boxClasses from '@/pages/test/Test.module.scss';
import { MultipleOutcome, MultipleTestData } from '@/shared/types/test';
import M_MultipleTestResult from '@/components/molecules/M_MultipleTestResult/M_MultipleTestResult';
import { shuffleArray } from '@/shared/utils/shuffleArray';

type Props = {
  test: MultipleTestData;
};

const MultipleTest = ({ test }: Props) => {
  const [questionNumber, setQuestionNumber] = useState(0);
  const [scores, setScores] = useState<Record<string, number>>(
    () =>
      test.outcomes.reduce<Record<string, number>>((acc, outcome) => {
        acc[outcome.id] = 0;
        return acc;
      }, {})
  );
  const [isDone, setIsDone] = useState(false);

  const length = test.questions.length;
  const question = test.questions[questionNumber];
  const shuffledAnswers = useMemo(() => {
    return question ? shuffleArray(question.answers) : [];
  }, [question]);

  const result = useMemo<MultipleOutcome | null>(() => {
    if (!isDone) return null;

    return test.outcomes.reduce<MultipleOutcome | null>((winner, outcome) => {
      if (!winner) return outcome;

      return scores[outcome.id] > scores[winner.id] ? outcome : winner;
    }, null);
  }, [isDone, scores, test.outcomes]);

  const changeQuestion = (outcomeId: string, score: number) => {
    setScores((prev) => ({
      ...prev,
      [outcomeId]: (prev[outcomeId] ?? 0) + score
    }));

    if (questionNumber + 1 === length) {
      setIsDone(true);
      return;
    }

    setQuestionNumber((prev) => prev + 1);
  };

  if (!length || !question) {
    return <div className={boxClasses.testbox}>{'В этом тесте пока нет вопросов('}</div>;
  }

  return isDone && result ? (
    <M_MultipleTestResult outcome={result} />
  ) : (
    <div className={boxClasses.testbox}>
      <span className={boxClasses.span}>
        вопрос {questionNumber + 1} из {length}
      </span>

      <h3 className={boxClasses.h3}>{question.question}</h3>

      <div className={classes.answers}>
        {shuffledAnswers.map((answer, index) => {
          return (
            <button
              className={classes.answer}
              key={`${questionNumber}-${index}`}
              onClick={() => changeQuestion(answer.outcomeId, answer.score)}
              type="button">
              {answer.answer}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default MultipleTest;
