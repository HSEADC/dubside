import React from 'react';
import classes from '@/components/molecules/M_FlipCard/M_FlipCard.module.scss';
import flipCards from '@/assets/data/flipCards/flipCards.json';

type Props = {
  nickname: string;
  children?: React.ReactNode;
};

interface SingerCard {
  name: string;
  points: string[];
  paragraph: string;
  songs: string[];
}

type FlipCardsMap = Record<string, SingerCard>;

const M_FlipCard = ({ nickname, children }: Props) => {
  const flipCardsObj: FlipCardsMap = flipCards;
  const singer: SingerCard = flipCardsObj[nickname];

  const backImgPath = `/images/flipCards/${nickname}/back.png`;
  const frontImgPath = `/images/flipCards/${nickname}/front.png`;

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
              <div key={s}>{s}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default M_FlipCard;
