import React from 'react';
import classes from '@/components/atoms/A_BadgeLikeButton/A_BadgeLikeButton.module.scss';

type Props = {
  children: React.ReactNode;
  color?: 'blue' | 'green' | 'red';
  disabled?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const A_BadgeLikeButton = ({ children, color, disabled, ...rest }: Props) => {
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
    colorClass = `${colorClass} ${classes.disabled}`;
  }

  return (
    <button className={colorClass} {...rest}>
      {children}
    </button>
  );
};

export default A_BadgeLikeButton;
