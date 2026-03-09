import React from 'react';
import classes from '@/components/molecules/M_FlipCard/M_FlipCard.module.scss';
import flipCards from '@/assets/data/flipCards/flipCards.json';
import { FlipCardsMap, SingerCard } from '@/shared/types/cards';
import M_Track from '../M_Track/M_Track';

type Props = {
  nickname: string;
  children?: React.ReactNode;
};

const M_FlipCard = ({ nickname, children }: Props) => {
  const flipCardsObj: FlipCardsMap = flipCards;
  const singer: SingerCard = flipCardsObj[nickname];

  const backImgPath = `${__PUBLIC_PATH__}images/${nickname}/back.png`;
  const frontImgPath = `${__PUBLIC_PATH__}images/${nickname}/front.png`;

  return (
    <div className={classes.wrapper}>
      <div className={classes.inner}>
        <div className={classes.front}>
          {/* <!-- Лицевая сторона --> */}
          <img src={frontImgPath} alt="frontImg" className={classes.img} />
          <h4 className={classes.h4}>{singer.name}</h4>
          <ul>
            {singer.points.map((p) => (
              <li className={classes.li} key={p}>
                {p}
              </li>
            ))}
          </ul>
          <p className={classes.label}>наведи курсор</p>
          {children}
        </div>
        <div className={classes.back}>
          {/* <!-- Обратная сторона (другая верстка) --> */}
          <img src={backImgPath} alt="backImg" className={classes.img} />
          <div className={classes.backdiv} />
          <div>
            <p className={classes.li}>{singer.paragraph}</p>
            <p className={classes.label}>подробнее на сайте</p>
          </div>
          <div>
            {singer.songs.map((s) => (
              <M_Track
                img={s.img}
                link={s.link}
                name={s.name}
                footer={s.footer}
                key={s.name}></M_Track>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default M_FlipCard;
