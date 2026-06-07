import React, { useEffect } from 'react';
import { useLocation } from 'react-router';
import Q_VideoBackground from '@/components/quarks/Q_VideoBackground/Q_VideoBackground';
import W_SectionElementsWrapper from '@/components/wrappers/W_SectionElementsWrapper/W_SectionElementsWrapper';
import { videosGuideMap } from '@/shared/constants/videoGuideMap';
import classes from '@/pages/styleguide/Styleguide.module.scss';
import O_MainTracks from '@/components/organisms/O_MainTracks/O_MainTracks';
import A_ImgSmall from '@/components/atoms/A_ImgSmall/A_ImgSmall';
import M_FlipCard from '@/components/molecules/M_FlipCard/M_FlipCard';
import artistGuideBlockInfo from '@/assets/data/guideArtistInfo/guideArtistInfo.json';

const videoLink = videosGuideMap.styleguide;
const kanyeTracks = artistGuideBlockInfo.kanye.tracks;

const Styleguide = () => {
  const { hash } = useLocation();

  const scrollToHash = (targetHash: string) => {
    const id = targetHash.replace('#', '');
    const element = document.getElementById(id);

    if (!element) return;

    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  };

  useEffect(() => {
    if (!hash) return;

    const animationFrame = window.requestAnimationFrame(() => {
      scrollToHash(hash);
    });

    return () => window.cancelAnimationFrame(animationFrame);
  }, [hash]);

  const handleAnchorClick = (event: React.MouseEvent<HTMLAnchorElement>, targetHash: string) => {
    event.preventDefault();
    window.history.replaceState(null, '', targetHash);
    scrollToHash(targetHash);
  };

  return (
    <div>
      <Q_VideoBackground source={videoLink} uppergrad={false} />

      <W_SectionElementsWrapper className={classes.firstblock}>
        <div className={classes.breakdiv}></div>
        <h1 className={classes.title}>Dubside</h1>
        <p className={classes.p}>Styleguide</p>
      </W_SectionElementsWrapper>

      <W_SectionElementsWrapper className={classes.mainwrapper}>
        <W_SectionElementsWrapper className={classes.wrapper}>
          <div className={classes.contents}>
            <span className={classes.label}>Содержание</span>
            <a href="#project" onClick={(event) => handleAnchorClick(event, '#project')}>
              О проекте
            </a>
            <a href="#naming" onClick={(event) => handleAnchorClick(event, '#naming')}>
              Нейминг
            </a>
            <a href="#typography" onClick={(event) => handleAnchorClick(event, '#typography')}>
              Типографика
            </a>
            <a href="#color-light" onClick={(event) => handleAnchorClick(event, '#color-light')}>
              Цвет и свет
            </a>
            <a href="#elements" onClick={(event) => handleAnchorClick(event, '#elements')}>
              Элементы
            </a>
          </div>
        </W_SectionElementsWrapper>

        <W_SectionElementsWrapper className={classes.wrapper}>
          <div className={classes.wrapperleft}>
            <h2 id="project" className={classes.anchorHeading}>
              О проекте
            </h2>

            <div>
              <p>
                Зарубежный хип-хоп становится ультра популярным среди русскоязычной молодёжи, но
                разобраться в нём с нуля — та ещё задача.
              </p>
              <p>
                Dubside — медиа о зарубежном хип-хопе, рэпе и смежных жанрах, ориентированный на
                тех, кто не имеет чётких представлений об этом музыкальном направлении и его
                культуре, но заинтересован в ознакомлении с современными культурными процессами.
              </p>
            </div>
          </div>
        </W_SectionElementsWrapper>

        <W_SectionElementsWrapper className={classes.wrapper}>
          <div className={classes.wrapperleft}>
            <h2 id="naming" className={classes.anchorHeading}>
              Нейминг
            </h2>

            <div>
              <h3 className={classes.h3}>(1)</h3>
              <p>
                Мы работаем над тем, чтобы русскоязычным ребятам было проще вкатиться в зарубежный
                хип-хоп. Dub — это буквально дубляж/перевод с иностранного языка.
              </p>
            </div>

            <div>
              <h3 className={classes.h3}>(2)</h3>
              <p>
                Наша задача — показать людям хип-хоп как глубокое и интересное, многогранное
                культурное течение. Мы хотим посмотреть на тренды под другим углом, показать то,
                почему они именно такие.
              </p>
              <p>
                Мы хотим копнуть глубже и рассказать о другой стороне популярного хип-хопа, показать
                больше, чем просто набор популярных треков.
              </p>
              <p>
                Дабовая сторона — это скрытая, дополнительаня сторона основного трека, записанного
                на пластике.
              </p>
            </div>

            <div>
              <h3 className={classes.h3}>(3)</h3>
              <p>
                Даб — музыкальный жанр, возникший в начале 1970-x годов на Ямайке. Как правило,
                композиции в стиле даб состоят из ремиксов существующих записей. Даб очень сильно
                повлиял на весь жанр хип-хопа.
              </p>
              <p>
                Этот смысл вторичен, но наше медиа тоже можно рассматривать как большой ремикс
                существующих записей. И мы хотим сконцентрироваться на том, что влияет на
                современную хип-хоп сценую :)
              </p>
            </div>
          </div>
          <div className={classes.wrapperright}>
            <h1>dubside</h1>
          </div>
        </W_SectionElementsWrapper>

        <W_SectionElementsWrapper className={classes.wrapper}>
          <div className={classes.wrapperleft}>
            <h2>Логотип</h2>

            <div>
              <h3 className={classes.h3}>(1)</h3>
              <p>
                Лого как пластинка и её перевернутая сторона — показываем хип-хоп с разным сторон.
              </p>
            </div>

            <div>
              <h3 className={classes.h3}>(2)</h3>
              <p>Лого как новостной поток нашего медиа, как течение музыки играющей пластинки.</p>
            </div>

            <div>
              <h3 className={classes.h3}>(3)</h3>
              <p>Лого как планета: рассматриваем культурное течение по всему миру.</p>
            </div>
          </div>
          <div className={classes.wrapperright}>
            <img
              src="https://dunchek-test-bucket.s3-website.cloud.ru/dubside/A_logo.svg"
              alt="logo"
            />
            <h1>dubside</h1>
            <h1>дабсайд</h1>
          </div>
        </W_SectionElementsWrapper>

        <W_SectionElementsWrapper>
          <div className={classes.photo1}>
            <A_ImgSmall
              source="https://dunchek-test-bucket.s3-website.cloud.ru/dubside/articles/imgs/bully/theeth.png"
              footer="Фотография + градиент + подпись"
              alt="Черно-белая фотография для примера плашки"
              // wrapperClassName={classes.photo1}
            />
          </div>
          <div className={classes.grids}>
            <A_ImgSmall
              source="https://dunchek-test-bucket.s3-website.cloud.ru/dubside/articles/imgs/bully/theeth.png"
              footer="Фотография + градиент + подпись"
              alt="Черно-белая фотография для примера плашки"
              wrapperClassName={classes.photo}
            />
            <A_ImgSmall
              source="https://dunchek-test-bucket.s3-website.cloud.ru/dubside/articles/imgs/bully/theeth.png"
              footer="Фотография + градиент + подпись"
              alt="Черно-белая фотография для примера плашки"
              wrapperClassName={classes.photo}
            />
          </div>
        </W_SectionElementsWrapper>

        <W_SectionElementsWrapper className={classes.wrapper}>
          <div className={classes.typographyblock}>
            <h2 id="typography" className={classes.anchorHeading}>
              Типографика
            </h2>
            <p className={classes.typographylead}>
              Наша типографическая система построена со шрифтом GT America. Проекту подходит его
              универсальность и современный, но не холодный тон.
            </p>

            <h3 className={classes.h3}>(1) Виды текста</h3>

            <div className={classes.typographyhero}>
              <div className={`${classes.typecard} ${classes.typecardlarge}`}>
                <div className={classes.typecardcontent}>
                  <h1>Heading 1</h1>
                  <p className={classes.label}>
                    64 | expanded
                    <br />
                    Заголовки
                  </p>
                </div>
              </div>

              <div className={classes.typecardstack}>
                <div className={`${classes.typecard} ${classes.typecardmedium}`}>
                  <div className={classes.typecardcontent}>
                    <h2>Heading 2</h2>
                    <p className={classes.label}>
                      48 | expanded
                      <br />
                      Подзаголовки
                    </p>
                  </div>
                </div>

                <div className={`${classes.typecard} ${classes.typecardsmall}`}>
                  <div className={classes.typecardcontent}>
                    <h3>Heading 3</h3>
                    <p className={classes.label}>
                      32 | expanded
                      <br />
                      Подзаголовки
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className={classes.typenote}>
              <p>
                Внутри системы используем expanded/extended версии, в зависимости от масштаба и
                назначения текста:
              </p>
              <ul className={classes.typelist}>
                <li>extended — в мелких текстах для чтения.</li>
                <li>expanded — в крупном наборе и логотипе.</li>
              </ul>
            </div>

            <div className={classes.typographygrid}>
              <div className={`${classes.typecard} ${classes.typecardsubheading}`}>
                <div className={classes.typecardcontent}>
                  <h4>Heading 4 (subheading)</h4>
                  <p className={classes.label}>
                    24 | expanded
                    <br />
                    Подзаголовки
                  </p>
                </div>
              </div>

              <div className={`${classes.typecard} ${classes.typecardtext2}`}>
                <div className={classes.typecardcontent}>
                  <div className={classes.typetextgroup}>
                    <p className={classes.typetexttitle}>
                      Text 2<br />
                      <br />
                      <span className={classes.typetext2}>
                        Пластинка построена как серия экзистенциальных дилемм и допускает нелинейное
                        прочтение, что усиливает её нарративную плотность.
                      </span>
                    </p>
                  </div>
                  <p className={classes.label}>
                    16 | extended
                    <br />
                    Подписи / дополнения / навигация
                  </p>
                </div>
              </div>

              <div className={`${classes.typecard} ${classes.typecardtext1}`}>
                <div className={classes.typecardcontent}>
                  <div className={classes.typetextgroup}>
                    <p className={classes.typetexttitle}>
                      Text 1<br />
                      <br />
                      Пластинка построена как серия экзистенциальных дилемм и допускает нелинейное
                      прочтение, что усиливает её нарративную плотность.
                    </p>
                  </div>
                  <p className={classes.label}>
                    20 | extended
                    <br />
                    Наборный текст
                  </p>
                </div>
              </div>

              <div className={`${classes.typecard} ${classes.typecardlabel}`}>
                <div className={classes.typecardcontent}>
                  <div className={classes.typetextgroup}>
                    <p className={classes.typetexttitle}>label</p>
                    <span className={classes.labelwhite}>
                      Совсем маленький мини-текст :) Opacity 55%
                    </span>
                    <p className={classes.label}>
                      14 | extended
                      <br />
                      Подписи
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <h3 className={classes.h3}>(2) Пример использования</h3>
          <div className={classes.examplecards}>
            <div className={classes.examplecardslist}>
              <M_FlipCard nickname="future" />
              <M_FlipCard nickname="carti" />
            </div>
            <div className={classes.examplelabels}>
              <div>
                <div>— Основной текст, 20 (вторая сторона)</div>
              </div>
              <div>
                <div>— Подзаголовок, 24</div>
                <br />
                <div>— Дополнение, 16</div>
                <br />
                <div>— Подпись, 14</div>
              </div>
            </div>
          </div>
        </W_SectionElementsWrapper>

        <W_SectionElementsWrapper className={classes.wrapper}>
          <div className={classes.wrapperleft}>
            <h2 id="color-light" className={classes.anchorHeading}>
              Цвет
            </h2>
            <div>
              <p>
                Хип-хоп слишком яркое и многогранное движение само по себе, поэтому было принято
                решение не замыкаться в цветовой палитре.
              </p>
              <p>
                Если нам необходим цвет, мы берем его прямо из той культурной точки, о которой идет
                речь! Наведите на любой трек.
              </p>
            </div>
          </div>
          <O_MainTracks tracks={kanyeTracks} className={classes.tracks}></O_MainTracks>
        </W_SectionElementsWrapper>

        <W_SectionElementsWrapper className={classes.wrapper}>
          <div className={classes.wrapperleft}>
            <h2 id="elements" className={classes.anchorHeading}>
              Элементы
            </h2>
            <div>
              <p>В качесвте основных элементов мы используем тексты и плашки. </p>
              <p>
                Любой блок-плашка содержит растворяющуюся обводку и фон. Фон может быть фотографией
                или пустым черным блоком, полупрозрачным сверху.{' '}
              </p>
              <p>
                Если мы используем фотографию, то для подписи кладем сверху градиент (он идет снизу
                или слева)
              </p>
            </div>
          </div>

          <div className={classes.grids}>
            <A_ImgSmall
              source="https://dunchek-test-bucket.s3-website.cloud.ru/dubside/articles/imgs/bully/theeth.png"
              footer="Фотография + градиент + подпись"
              alt="Черно-белая фотография для примера плашки"
              wrapperClassName={classes.photo}
            />
            <div className={classes.elementcardplain}>
              <span className={classes.elementcardlabel}>Блок без фотографии + фон</span>
            </div>
          </div>

          <div>
            <p>Главная метафора нашего дизайна — это свет.</p>
            <p>
              Градиенты и переходность отсылает к свету софитов, плавно растворяющемуся в тьме
              вокруг сцены. Дизайн подсвечивает агентов того движения, о котором мы рассказываем.
            </p>
          </div>
        </W_SectionElementsWrapper>
      </W_SectionElementsWrapper>
    </div>
  );
};

export default Styleguide;
