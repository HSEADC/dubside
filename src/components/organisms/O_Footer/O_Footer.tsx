import React, { useState } from 'react';
import classes from '@/components/organisms/O_Footer/O_Footer.module.scss';
import A_Button from '@/components/atoms/A_Button/A_Button';
import M_Input from '@/components/molecules/M_Input/M_Input';
import W_SectionElementsWrapper from '@/components/wrappers/W_SectionElementsWrapper/W_SectionElementsWrapper';
import { Link } from 'react-router';

const FORMSPREE_URL = 'https://formspree.io/f/xzdjpdgn';

const O_Footer = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState(''); // idle | sending | success | error

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('Отправляем...');

    const formData = new FormData();
    formData.append('email', email);

    try {
      const res = await fetch(FORMSPREE_URL, {
        method: 'POST',
        body: formData,
        headers: { Accept: 'application/json' }
      });

      if (res.ok) {
        setStatus('Вы подписались, спасибо!');
        setEmail('');
        return;
      }
      setStatus('Ошибка отправки. Попробуйте позже.');
    } catch {
      setStatus('Сеть/сервер недоступны. Попробуйте позже.');
    }
  }
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
            <p className={classes.text2}>
              Студенческий проект <br />
              Школы Дизайна ВШЭ, 2026
            </p>
          </div>
        </div>
        <div className={classes.right}>
          <p>Новостная рассылка по почте (не спамим)</p>

          <form className={classes.form} onSubmit={onSubmit}>
            <span className={classes.label}>{status}</span>

            <div className={classes.inputwrap}>
              <M_Input
                placeholder="Example@email.ru"
                id="newsletter-email"
                type="email"
                name="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}></M_Input>
              <button className={classes.btn}>
                <img src={`${__PUBLIC_PATH__}icons/Q_Arrow.png`} alt="btn" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </W_SectionElementsWrapper>
  );
};

export default O_Footer;
