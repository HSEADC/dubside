import React from 'react';
import classes from '@/components/molecules/M_NavBar/M_NavBar.module.scss';
import A_Link from '@/components/atoms/A_Link/A_Link';
import A_Button from '@/components/atoms/A_Button/A_Button';
import { useLocation } from 'react-router';

const NavBar = () => {
  const path = useLocation().pathname;
  let isActive = '/';

  switch (path) {
    case '/cards':
      isActive = '/cards';
      break;
    case '/tests':
      isActive = '/tests';
      break;
    case '/about':
      isActive = '/about';
      break;
    case '/articles':
      isActive = '/articles';
      break;

    case '/':
      isActive = '/';
      break;
    default:
      isActive = '/';

      break;
  }

  if (path.startsWith('/articles')) isActive = '/articles';
  if (path.startsWith('/tests')) isActive = '/tests';

  return (
    <nav className={classes.nav}>
      <div className={classes.wrapper}>
        <A_Link to="/">
          <A_Button isActive={'/' === isActive}>гайд</A_Button>
        </A_Link>
        <A_Link to="/articles">
          <A_Button isActive={'/articles' === isActive}>статьи</A_Button>
        </A_Link>
        <A_Link to="/cards">
          <A_Button isActive={'/cards' === isActive}>карточки</A_Button>
        </A_Link>
        <A_Link to="/tests">
          <A_Button isActive={'/tests' === isActive}>тесты</A_Button>
        </A_Link>
        <A_Link to="/about">
          <A_Button isActive={'/about' === isActive}>о проекте</A_Button>
        </A_Link>
      </div>
    </nav>
  );
};

export default NavBar;
