import React from 'react';

import classes from '@/components/molecules/M_TestCard/M_TestCard.module.scss';
import A_Badge from '@/components/atoms/A_Badge/A_Badge';
import testsData from '@/assets/data/tests/tests.json';

interface Props {
  id: TestId;
  size: 'mini' | 'mid' | 'max';
}

type TestId = keyof typeof testsData;

const M_TestCard = ({ id, size }: Props) => {
  let wrapper;
  if (size === 'mini') {
    wrapper = classes.mini;
  } else if (size === 'max') {
    wrapper = classes.max;
  } else {
    wrapper = classes.mid;
  }

  const testData = testsData[id];

  return (
    <div className={wrapper}>
      <img className={classes.img} src={testData.img} alt="img" />
      <div className={classes.grad}></div>
      <div className={classes.buttons}>
        <A_Badge>{testData.timing}</A_Badge>
        <A_Badge>{testData.hardness}</A_Badge>
      </div>
      <h4>{testData.heading}</h4>
    </div>
  );
};

export default M_TestCard;
