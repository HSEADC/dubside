import React from 'react';
import classes from '@/components/collections/C_TestAnswers/C_TestAnswers.module.scss';
import { C_TestAnswersProps } from '@/shared/types/test';

const C_TestAnswers = ({
  test,
  questionNumber,
  checked,
  setChecked,
  changeQuestion
}: C_TestAnswersProps) => {
  return (
    <div className={classes.answers}>
      {test.questions[questionNumber].answers.map((q, i) => {
        return (
          <div className={classes.answer} key={`${questionNumber}-${i}`}>
            <label className={classes.label}>
              <input
                className={classes.input}
                type="checkbox"
                checked={!!checked[i]}
                onChange={(e) => {
                  const next = [...checked];
                  next[i] = e.target.checked;
                  setChecked(next);
                }}
                onClick={() => changeQuestion(+q.count)}
              />
              <span>{q.answer}</span>
            </label>
          </div>
        );
      })}
    </div>
  );
};

export default C_TestAnswers;
