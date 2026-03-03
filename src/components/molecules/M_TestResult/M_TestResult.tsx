import React from 'react';
import classes from '@/components/molecules/M_TestResult/M_TestResult.module.scss';
import checkResult from '@/shared/utils/checkResult';

type M_TestResultProps = {
  count: number;
  length: number;
};

const M_TestResult = ({ count, length }: M_TestResultProps) => {
  return (
    <div className={classes.testbox}>
      <h3>
        Ваш результат: {count}. {checkResult(count, length)[2]}.
      </h3>
      <p className={classes.answers}>{checkResult(count, length)[0]}</p>
      <div className={classes.resultimg}>
        <img src={checkResult(count, length)[1]} alt="resultImg" className={classes.result} />
      </div>
    </div>
  );
};

export default M_TestResult;
