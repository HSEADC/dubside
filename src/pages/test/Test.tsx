import Q_VideoBackground from '@/components/quarks/Q_VideoBackground/Q_VideoBackground';
import W_SectionElementsWrapper from '@/components/wrappers/W_SectionElementsWrapper/W_SectionElementsWrapper';
import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import classes from '@/pages/test/Test.module.scss';

const Test = () => {
  useEffect(() => {
    const prev = document.body.style.overflowY;
    document.body.style.overflowY = 'hidden';
    return () => {
      document.body.style.overflowY = prev;
    };
  }, []);

  const params = useParams();
  const id = params.id;
  const videoLink = 'https://dunchek-test-bucket.s3-website.cloud.ru/dubside/videos/tests.mp4';

  return (
    <section className={classes.wrapper}>
      <Q_VideoBackground source={videoLink} uppergrad={false} />
      <W_SectionElementsWrapper>
        <div className={classes.testbox}>
          <span className={classes.span}>
            вопрос {3} из {5}
          </span>
          <h3>текст вопроса {id}</h3>
          <div className={classes.answers}>
            <div className={classes.answer}>
              <label className={classes.label}>
                <input className={classes.input} type="checkbox" />
                текст ответа
              </label>
            </div>
            <div className={classes.answer}>
              <label className={classes.label}>
                <input className={classes.input} type="checkbox" />
                текст ответа
              </label>
            </div>
            <div className={classes.answer}>
              <label className={classes.label}>
                <input className={classes.input} type="checkbox" />
                текст ответа
              </label>
            </div>
            <div className={classes.answer}>
              <label className={classes.label}>
                <input className={classes.input} type="checkbox" />
                текст ответа
              </label>
            </div>
          </div>
        </div>
      </W_SectionElementsWrapper>
    </section>
  );
};

export default Test;
