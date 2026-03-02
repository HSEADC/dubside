import React from 'react';
import classes from '@/components/atoms/A_Link/A_Link.module.scss';
import { Link } from 'react-router';

interface A_LinkPropsTypes {
  to: string;
  text?: string;
  children?: React.ReactNode;
}

const A_Link = ({ to, text, children }: A_LinkPropsTypes) => {
  return (
    <Link to={to} className={classes.link}>
      {text}
      {children}
    </Link>
  );
};

export default A_Link;
