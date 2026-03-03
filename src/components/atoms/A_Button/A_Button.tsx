import classes from '@/components/atoms/A_Button/A_Button.module.scss';

import React from 'react';

type Props = {
  children: React.ReactNode;
  isActive: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const A_Button = (props: Props) => {
  const classname = props.isActive ? classes.active : classes.nonactive;
  return <button className={classname}>{props.children}</button>;
};

export default A_Button;
