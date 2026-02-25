import React from 'react';
import classes from '@/components/molecules/M_NavBar/M_NavBar.module.scss';
import A_Link from '@/components/atoms/A_Link';

const NavBar = () => {
  return (
    <nav className={classes.nav}>
      <A_Link to="/" text="гайд"></A_Link>
      <A_Link to="/articles" text="материалы"></A_Link>
      <A_Link to="/tests" text="тесты"></A_Link>
      <A_Link to="/about" text="о проекте"></A_Link>
    </nav>
  );
};

export default NavBar;
