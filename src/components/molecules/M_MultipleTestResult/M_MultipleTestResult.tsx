import React from 'react';
import classes from '@/components/molecules/M_MultipleTestResult/M_MultipleTestResult.module.scss';
import { MultipleOutcome } from '@/shared/types/test';

type Props = {
  outcome: MultipleOutcome;
};

const M_MultipleTestResult = ({ outcome }: Props) => {
  return (
    <div className={classes.testbox}>
      <span className={classes.span}>Ваш итог</span>
      <h3 className={classes.h3}>{outcome.title}</h3>
      <p className={classes.answers}>{outcome.description}</p>
      {outcome.img ? (
        <div className={classes.resultimg}>
          <img src={outcome.img} alt={outcome.title} className={classes.result} />
        </div>
      ) : null}
    </div>
  );
};

export default M_MultipleTestResult;
