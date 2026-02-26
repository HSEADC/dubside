import M_FlipCard from '@/components/molecules/M_FlipCard/M_FlipCard';
import React, { useEffect, useMemo, useState } from 'react';
import classes from '@/components/organisms/O_CardSlider/O_CardSlider.module.scss';

const O_CardSlider = () => {
  const items = useMemo(
    () => [
      { id: 0, nickname: 'kendrick' },
      { id: 1, nickname: 'drake' },
      { id: 2, nickname: 'kanye' },
      { id: 3, nickname: 'emenem' },
      { id: 4, nickname: 'jay-z' },
      { id: 5, nickname: 'nicki' },
      { id: 6, nickname: 'travis' },
      { id: 7, nickname: '50-cent' },
      { id: 8, nickname: 'carti' },
      { id: 9, nickname: 'future' },
      { id: 10, nickname: 'wayne' },
      { id: 11, nickname: 'cole' }
    ],
    []
  );

  const posClasses = [
    classes.posa,
    classes.posb,
    classes.posc,
    classes.posd,
    classes.pose,
    classes.posf,
    classes.posg,
    classes.posh,
    classes.posi,
    classes.posj,
    classes.posk,
    classes.posl
  ];

  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setOffset((current) => (current + 1) % items.length);
    }, 5000);

    return () => window.clearInterval(id);
  }, [items.length]);

  return (
    <div className={classes.wrapper}>
      {items.map((item, index) => {
        const posIndex = (index + offset) % items.length;
        return (
          <div key={item.id} className={`${classes.card} ${posClasses[posIndex]}`}>
            <M_FlipCard nickname={item.nickname} />
          </div>
        );
      })}
    </div>
  );
};

export default O_CardSlider;
