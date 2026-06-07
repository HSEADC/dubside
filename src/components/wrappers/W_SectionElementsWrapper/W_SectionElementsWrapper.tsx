import React from 'react';
import classes from '@/components/wrappers/W_SectionElementsWrapper/W_SectionElementsWrapper.module.scss';

type Props = {
  children: React.ReactNode;
  className?: string;
};

const W_SectionElementsWrapper = ({ children, className }: Props) => {
  return <div className={[classes.sewrapper, className].join(' ')}>{children}</div>;
};

export default W_SectionElementsWrapper;
