import React from 'react';
import classes from '@/components/atoms/A_Link.module.scss';
import { Link } from 'react-router';

interface A_LinkPropsTypes {
  to: string;
  text: string;
}

const A_Link = ({ to, text }: A_LinkPropsTypes) => {
  return (
    <Link to={to} className={classes.link}>
      {text}
    </Link>
  );
};

export default A_Link;
