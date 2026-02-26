import React from 'react';
import classes from '@/components/wrappers/W_SectionElementsWrapper/W_SectionElementsWrapper.module.scss';

type Props = {
  children: React.ReactNode;
};

const W_SectionElementsWrapper = ({ children }: Props) => {
  return <div className={classes.sewrapper}>{children}</div>;
};

export default W_SectionElementsWrapper;
