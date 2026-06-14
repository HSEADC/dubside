import React from 'react';
import W_SectionElementsWrapper from '@/components/wrappers/W_SectionElementsWrapper/W_SectionElementsWrapper';
import classes from '@/pages/special-project/SpecialProject.module.scss';
import Q_SpecialProjectGradient from '@/components/quarks/Q_SpecialProjectGradient/Q_SpecialProjectGradient';
import Q_AnswerQuestion from '@/components/quarks/Q_AnswerQuestion/Q_AnswerQuestion';
// import uhImage from '@/assets/images/uh.png';

const SpecialProject = () => {
  const scrollToHash = (targetHash: string) => {
    const id = targetHash.replace('#', '');
    const element = document.getElementById(id);

    if (!element) return;

    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  };

  const handleAnchorClick = (event: React.MouseEvent<HTMLAnchorElement>, targetHash: string) => {
    event.preventDefault();
    window.history.replaceState(null, '', targetHash);
    scrollToHash(targetHash);
  };

  return (
    <div className={classes.page}>
      <Q_SpecialProjectGradient />
      <W_SectionElementsWrapper className={classes.content}>
        <div className={classes.breakdiv}></div>
        <h2 className={classes.h2}>Интервью с Никитой, автором тг-канала «Уголок Хип-хопа»</h2>
        <p>
          Автор телеграм-канала «Уголок Хип-хопа» о границе между музыкальной журналистикой и
          авторским блогом, коллекционировании физических носителей, российской музыкальной
          индустрии и людях, которые помогают не застревать в собственном пузыре.
        </p>
      </W_SectionElementsWrapper>

      <W_SectionElementsWrapper className={classes.content}>
        <div className={classes.contents}>
          <span className={classes.label}>Содержание:</span>
          <a
            className={classes.contentsIntro}
            href="#editorial-comment"
            onClick={(event) => handleAnchorClick(event, '#editorial-comment')}>
            Комментарий редакции
          </a>
          <div className={classes.contentsList}>
            <a
              href="#hip-hop-channel"
              onClick={(event) => handleAnchorClick(event, '#hip-hop-channel')}>
              1. От увлечения хип-хопом к собственному каналу
            </a>
            <a href="#blog-growth" onClick={(event) => handleAnchorClick(event, '#blog-growth')}>
              2. Авторский блог и границы его роста
            </a>
            <a
              href="#music-journalism-future"
              onClick={(event) => handleAnchorClick(event, '#music-journalism-future')}>
              3. Музыкальная журналистика, публицистика и взгляд в будущее
            </a>
            <a
              href="#physical-media"
              onClick={(event) => handleAnchorClick(event, '#physical-media')}>
              4. Зачем музыке снова нужен физический носитель
            </a>
            <a href="#why-cd" onClick={(event) => handleAnchorClick(event, '#why-cd')}>
              5. Почему Никита выбирает CD
            </a>
            <a
              href="#global-artist"
              onClick={(event) => handleAnchorClick(event, '#global-artist')}>
              6. Может ли российский артист стать глобальным
            </a>
            <a
              href="#nostalgic-audience"
              onClick={(event) => handleAnchorClick(event, '#nostalgic-audience')}>
              7. Аудитория, которой есть что вспомнить
            </a>
          </div>
          <a
            className={classes.contentsOutro}
            href="#editorial-conclusion"
            onClick={(event) => handleAnchorClick(event, '#editorial-conclusion')}>
            Заключение редакции
          </a>
          <a
            className={classes.contentsOutro}
            href="#nikita-recommendations"
            onClick={(event) => handleAnchorClick(event, '#nikita-recommendations')}>
            Рекомендации Никиты
          </a>
        </div>
      </W_SectionElementsWrapper>

      <W_SectionElementsWrapper className={classes.content}>
        <h3 className={classes.h3}>Вступление</h3>
        <p>
          Мы не профессиональные музыкальные журналисты и только учимся работать с этой темой.
          Поэтому нам было важно поговорить с человеком, который давно слушает хип-хоп,
          систематически пишет о нём и имеет вокруг своего проекта активное сообщество.
        </p>
        <p>
          Так, мы обратились к Никите — автору телеграм-канала «Уголок Хип-хопа». Он согласился
          созвониться, ответить на наши вопросы и помочь превратить разговор в отдельный спецпроект
          Dubside.
        </p>
      </W_SectionElementsWrapper>
      <W_SectionElementsWrapper className={classes.content}>
        <div className={classes.hero}>
          <div
            className={classes.heroImage}
            // style={{ backgroundImage: `url(${uhImage})` }}
            aria-hidden="true"
          />
          <div className={classes.heroGradient} aria-hidden="true" />
          <div className={classes.heroContent}>
            <h4>Никита, 28 лет</h4>
            <div className={classes.heroblocks}>
              <div>
                <p>
                  Автор телеграм-канала «Уголок Хип-хопа», на который подписаны почти четыре тысячи
                  человек. Канал существует с января 2022 года и представляет собой авторский блог о
                  хип-хопе: его истории, отдельных артистах и альбомах, физических носителях и
                  музыкальном коллекционировании.
                </p>
              </div>
              <div>
                <p>
                  Вокруг «Уголка Хип-хопа» постепенно сформировалась активная аудитория, которая
                  дополняет публикации воспоминаниями, подробностями о старых релизах и собственным
                  опытом участия в музыкальной культуре.
                </p>
              </div>
            </div>
          </div>
        </div>
      </W_SectionElementsWrapper>
      <W_SectionElementsWrapper className={classes.content}>
        <div className={classes.interview}>
          <Q_AnswerQuestion type="question">
            <p>
              Ты слушаешь хип-хоп уже больше пятнадцати лет. С чего началось это увлечение и почему
              оно сохранилось?
            </p>
          </Q_AnswerQuestion>
          <Q_AnswerQuestion type="answer">
            <p>
              Сложно сказать однозначно. Музыку вообще и хип-хоп в частности я серьёзно слушаю уже
              больше пятнадцати лет — примерно с двенадцати-тринадцати.
            </p>
            <p>
              Сначала он привлекал меня совершенно по-детски: казался просто самой крутой музыкой,
              которую можно найти. Он ложился на слух, был интересным — и этого было достаточно.
            </p>
            <p>
              Потом начинаешь углубляться в историю и культуру, и открываются дополнительные слои. Я
              вообще человек, склонный изучать вещи и копать глубоко. Мои увлечения редко бывают
              поверхностными, поэтому с хип-хопом сложилась такая долгая связь.
            </p>
          </Q_AnswerQuestion>
          <Q_AnswerQuestion type="answer-big">
            <h4>
              Меня этот жанр привлекает тем, что в нём всегда есть что изучать: в нём постоянно
              происходят живые процессы и есть интересное прошлое, которое невозможно познать до
              конца.
            </h4>
          </Q_AnswerQuestion>
        </div>
      </W_SectionElementsWrapper>
    </div>
  );
};

export default SpecialProject;
