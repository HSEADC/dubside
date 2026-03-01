import React from 'react';
import classes from '@/components/atoms/A_Badge/A_Badge.module.scss';

interface Props {
  children: React.ReactNode;
  color?: 'blue' | 'green' | 'red';
}

const A_Badge = ({ children, color }: Props) => {
  let colorClass;

  if (!color) {
    colorClass = classes.default;
  } else if (color === 'blue') {
    colorClass = classes.badge;
  } else if (color === 'green') {
    colorClass = classes.green;
  } else {
    colorClass = classes.red;
  }

  return <div className={colorClass}>{children}</div>;
};

export default A_Badge;
