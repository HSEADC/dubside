import React, { ReactNode } from 'react';
import classes from '@/components/quarks/Q_AnswerQuestion/Q_AnswerQuestion.module.scss';

type Q_AnswerQuestionProps = {
  type: 'answer' | 'question' | 'answer-big' | 'comment';
  children: ReactNode;
};

const Q_AnswerQuestion = ({ type, children }: Q_AnswerQuestionProps) => {
  const typeClass =
    type === 'answer'
      ? classes.answer
      : type === 'question'
        ? classes.question
        : type === 'answer-big'
          ? classes.answerBig
          : classes.comment;

  return (
    <div className={`${classes.wrapper} ${typeClass}`}>
      {type !== 'comment' ? <h2 className={classes.quote}>“</h2> : null}
      <div className={classes.content}>{children}</div>
    </div>
  );
};

export default Q_AnswerQuestion;
