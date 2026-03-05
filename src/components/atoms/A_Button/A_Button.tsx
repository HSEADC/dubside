import classes from '@/components/atoms/A_Button/A_Button.module.scss';

import React from 'react';

type Props = {
  children: React.ReactNode;
  isActive?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const A_Button = ({ isActive, children, ...rest }: Props) => {
  return (
    <button className={isActive ? classes.active : classes.nonactive} {...rest}>
      {children}
    </button>
  );
};

export default A_Button;
