import React from 'react';

import classes from '@/components/molecules/M_TestCard/M_TestCard.module.scss';
import A_Badge from '@/components/atoms/A_Badge/A_Badge';
import testsDataRaw from '@/assets/data/tests/tests.json';
// import A_Link from '@/components/atoms/A_Link/A_Link';
import { useNavigate } from 'react-router';

interface Props {
  id: TestId;
  size: 'mini' | 'mid' | 'max';
}

type TestId = keyof typeof testsDataRaw;

type Color = 'red' | 'blue' | 'green';
type Hardness = 'normal' | 'hard' | 'easy';
type TestData = {
  hardness: Hardness;
  timing: string;
  heading: string;
  img: string;
};

const testsData = testsDataRaw as Record<TestId, TestData>;

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

  const hardness: Hardness = testData.hardness;
  const color: Color = hardness === 'normal' ? 'blue' : hardness === 'hard' ? 'red' : 'green';

  const navigate = useNavigate();

  return (
    <div className={wrapper} onClick={() => navigate(`/tests/${id}`)}>
      <img className={classes.img} src={testData.img} alt="img" />
      <div className={classes.grad}></div>
      <div className={classes.buttons}>
        <A_Badge>{testData.timing}</A_Badge>
        <A_Badge color={color}>{testData.hardness}</A_Badge>
      </div>
      <h4>{testData.heading}</h4>
    </div>
  );
};

export default M_TestCard;
