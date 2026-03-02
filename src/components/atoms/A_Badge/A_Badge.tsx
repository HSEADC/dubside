import React from 'react';
import classes from '@/components/atoms/A_Badge/A_Badge.module.scss';

interface Props {
  children: React.ReactNode;
  color?: 'blue' | 'green' | 'red';
  disabled?: boolean;
}

const A_Badge = ({ children, color, disabled }: Props) => {
  let colorClass;

  if (!color) {
    colorClass = classes.default;
  } else if (color === 'blue') {
    colorClass = classes.blue;
  } else if (color === 'green') {
    colorClass = classes.green;
  } else {
    colorClass = classes.red;
  }

  if (disabled) {
    colorClass = classes.disabled;
  }

  return <div className={colorClass}>{children}</div>;
};

export default A_Badge;
