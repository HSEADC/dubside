import React from 'react';

import classes from '@/components/molecules/M_TestCard/M_TestCard.module.scss';
import A_Badge from '@/components/atoms/A_Badge/A_Badge';
import testsDataRaw from '@/assets/data/tests/tests.json';
import { useNavigate } from 'react-router';
import { Hardness, TestId } from '@/shared/types/test';

interface Props {
  id: TestId;
  size: 'mini' | 'mid' | 'max';
}

type Color = 'red' | 'blue' | 'green';
type TestData = {
  hardness: Hardness;
  timing: string;
  heading: string;
  img?: string;
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
  const color: Color | undefined =
    hardness === 'normal' ? 'blue' : hardness === 'hard' ? 'red' : hardness === 'easy' ? 'green' : undefined;

  const navigate = useNavigate();

  return (
    <div className={wrapper} onClick={() => navigate(`/tests/${id}`)}>
      {testData.img ? <img className={classes.img} src={testData.img} alt="img" /> : null}
      <div className={classes.grad}></div>
      <div className={classes.buttons}>
        <A_Badge>{testData.timing}</A_Badge>
        <A_Badge color={color}>
          {hardness === 'multiple'
            ? 'Multiple'
            : testData.hardness.charAt(0).toUpperCase() + testData.hardness.slice(1)}
        </A_Badge>
      </div>
      <h4>{testData.heading}</h4>
    </div>
  );
};

export default M_TestCard;
