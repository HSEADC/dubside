import React from 'react';
import classes from '@/components/atoms/A_Loader/A_Loader.module.scss';

const A_Loader = () => {
  return (
    <div className={classes.wrapper}>
      <div className={classes.loader}></div>
    </div>
  );
};

export default A_Loader;
