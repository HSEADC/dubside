import React from 'react';
import classes from '@/components/organisms/O_Footer/O_Footer.module.scss';
import A_Button from '@/components/atoms/A_Button/A_Button';
import M_Input from '@/components/molecules/M_Input/M_Input';
import W_SectionElementsWrapper from '@/components/wrappers/W_SectionElementsWrapper/W_SectionElementsWrapper';
import { Link } from 'react-router';

const O_Footer = () => {
  return (
    <W_SectionElementsWrapper>
      <div className={classes.wrapper}>
        <div className={classes.left}>
          <div className={classes.buttons}>
            <Link to="/about">
              <A_Button isActive={true}>О проекте</A_Button>
            </Link>
            <A_Button isActive={true}>Контакты</A_Button>
            <Link to="https://t.me/inthehotflow">
              <A_Button isActive={true}>Телеграмм канал</A_Button>
            </Link>
          </div>
          <div className={classes.info}>
            <Link to="/">
              <h4>dubside</h4>
            </Link>
            <p className={classes.text2}>Студенческий проект Школы Дизайна ВШЭ, 2026</p>
          </div>
        </div>
        <div className={classes.right}>
          <p>Новостная рассылка по почте (не спамим)</p>
          <M_Input placeholder="example@email.ru"></M_Input>
        </div>
      </div>
    </W_SectionElementsWrapper>
  );
};

export default O_Footer;
