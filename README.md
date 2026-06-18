# dubside

Dubside — медиа о зарубежном хип-хопе

React-приложение (TypeScript) с роутингом на `react-router`, сборкой на Webpack и статическим деплоем из папки `docs/`. Сейчас конфигурация ориентирована на корень домена (в проекте уже лежит `public/CNAME` для кастомного домена), но сама схема деплоя остаётся совместимой с GitHub Pages.

### Стек

- React 19 + React DOM
- React Router 7
- TypeScript
- Webpack 5 (+ dev-server, React Refresh)
- SCSS (в т.ч. SCSS Modules)
- ESLint + Prettier

### Быстрый старт

```bash
yarn
yarn start
```

Dev-сервер по умолчанию открывается сам и работает на `http://localhost:8080`.

### Скрипты

- `yarn start` — dev-сервер (`webpack-dev-server`) с HMR.
- `yarn build:dev` — сборка в development-режиме.
- `yarn build:prod` — production-сборка (вывод в `docs/`).
- `yarn build:gh` — production-сборка для статического хостинга/GitHub Pages (текущий `publicPath=/`, вывод в `docs/`).
- `yarn prerender:gh` — пререндерит несколько маршрутов в статические HTML внутри `docs/` (запускать после `build:gh`).
- `yarn build:gh:prerender` — `build:gh` + `prerender:gh`.
- `yarn deploy:pages` — публикует содержимое `docs/` через `gh-pages`.

---

## Особенности проекта

### Пререндер (SSG-подобный для статической публикации)

Скрипт `src/scripts/prerender-gh.ts` запускается через `ts-node` и:

- берёт `docs/index.html` как шаблон
- сервер-рендерит React-роуты через `react-dom/server` и `react-router` (`createStaticHandler/createStaticRouter`);
- подменяет содержимое `<div id="root">...</div>` на отрендеренный HTML;
- пишет файлы:
  - `docs/index.html`
  - `docs/about/index.html`
  - `docs/articles/index.html`
  - `docs/cards/index.html`
  - `docs/tests/index.html`
  - `docs/styleguide/index.html`

Ограничения/нюансы:

- пререндерятся только фиксированные маршруты (`/`, `/about`, `/articles`, `/cards`, `/tests`, `/styleguide`); динамические вроде `/articles/:slug`, `/tests/:id` и текущий `/special-project` остаются CSR.
- для работы нужен Node.js 18+ (в скрипте проверяется наличие глобального `Request`).
- скрипт делает хук для алиаса `@/` и заглушки для импортов ассетов/стилей, чтобы Node мог импортировать компоненты.
- `__PUBLIC_PATH__` вручную задаётся в `globalThis`, потому что в Node его не инжектит Webpack `DefinePlugin`.


### SPA fallback и базовый путь

- В текущей прод-сборке используется корневой `publicPath=/` (см. `webpack.config.ts` и скрипт `build:gh`).
- `public/404.html` — SPA fallback для статического хостинга/GitHub Pages: неизвестные пути редиректятся на `/?p=<route>`.
- `src/index.tsx` при старте восстанавливает исходный путь из query-параметра `p`, чтобы React Router корректно поднялся на нужном роуте.
- В коде сохранены комментарии про старый base path `/dubside`: это след от прежней схемы деплоя, сейчас активна конфигурация для корня домена.


### Ассеты: `__PUBLIC_PATH__` и копирование из `public/`

Webpack копирует содержимое `public/` в `docs/` (кроме `public/index.html`) и задаёт глобальную переменную `__PUBLIC_PATH__`.

В коде `__PUBLIC_PATH__` используется для ссылок на ассеты из `public/`, например:

- `public/icons/*` (иконки, стрелки)
- `public/images/<artist>/{front,back}.png` (картинки для карточек)


### Картинки/видео вне репозитория

Часть медиа не хранится в git и подгружается по URL (объектное хранилище). Сейчас в проекте используются ссылки вида:

- `https://dunchek-test-bucket.s3-website.cloud.ru/dubside/...`

Где это задаётся:

- `src/shared/constants/videoGuideMap.ts` — мапа ссылок на видеобэкграунды для гайда по артистам.
- `src/assets/data/articles/articlesInfo.json` и файлы в `src/assets/data/articles/*.json` — превью статей и ссылки на json'ы с контентом статей.
- `src/assets/data/tests/tests.json` — изображения для тестов в json'e с каждым тестом.
- `src/shared/utils/checkResult.ts` — картинки результатов тестов (`result_good/ok/bad`).
- `public/index.html` — OG/Twitter meta image (`meta.png`) — внешняя.

> Все внешние медиа лежат в бакете на `icloud.ru` (поэтому с впн они не доступны)
>
> Если нужно хранить медиа в другом месте, удобнее всего централизованно заменить базовый URL в данных/константах, а не править вручную в компонентах.


### Архитектура UI

Компоненты разложены по уровням (по Atomic Design):

- `quarks/` — небольшие “примитивы” (например, изображения/видео-бэкграунды).
- `atoms/` — базовые UI-кирпичики (кнопки, ссылки, лоадер).
- `molecules/` — композиции из atoms (карточки, инпуты, навбар).
- `organisms/` / `super-organisms/` — крупные секции/блоки.
- `wrappers/` — обёртки/лейаут и вспомогательные контейнеры.

Роуты загружаются лениво (`*.lazy.tsx`) и обёрнуты в `Suspense` с `A_Loader`.

> Чтобы webpack нарезал страницы на отдельные чанки и не тащил весь код всех страниц в первый main.js. Пока чанк страницы догружается, показывается лоадер
>
> (Пререндер один раз в Node генерит готовые HTML-файлы, там lazy/Suspense не используются: скрипт импортирует страницы напрямую. Пользователь сначала получает уже заполненный HTML и видит контент сразу, а затем в браузере монтируется клиентское SPA-приложение с тем же роутингом. Когда пользователь переходит между страницами внутри сайта, роутер будет грузить страницы лениво (чанками) через \*.lazy.tsx.)

В `special-project` есть отдельный декоративный слой на `pixi.js`: `Q_SpecialProjectGradient` рисует фоновый градиент через canvas/WebGL, добавляет displacement-эффект и лёгкий grain. Вспомогательные функции для шума, clamp и seeded-random вынесены в `src/shared/utils/specialProjectGradient.ts`.

Это изолированная визуальная часть страницы спецпроекта: остальной UI не завязан на Pixi и продолжает жить в обычных React-компонентах и SCSS-модулях.

---

## Структура проекта

```text
react-dubside/
  README.md
  package.json
  yarn.lock
  tsconfig.json                  — настройки TypeScript + алиас @/* -> src/*
  webpack.config.ts              — входная точка Webpack-конфига (вывод в docs/, entry src/index.tsx)
  eslint.config.mts
  .prettierrc
  .gitignore

  config/                        — сборочная инфраструктура Webpack
    build/
      buildWebpack.ts            — сборка итогового webpack config
      buildDevServer.ts          — импорт конфиг части с dev-server (HMR, historyApiFallback)
      buildPlugins.ts            — импорт конфиг части с плагинами (HtmlWebpackPlugin, DefinePlugin, CopyPlugin, etc.)
      buildResolvers.ts          — импорт конфиг части с resolve + алиас @ -> src
      buildLoaders.ts            — импорт конфиг части с лоадерами
      types/
        types.ts                 — типы BuildOptions/Paths/Mode/Platform

  public/                        — статические файлы, копируются в docs/ при сборке
    index.html                   — HTML-шаблон (HtmlWebpackPlugin), содержит meta/OG
    404.html                     — SPA fallback для неизвестных путей (редирект на /?p=...)
    robots.txt                   — robots (для индексации и SEO)
    sitemap.xml                  — sitemap (для индексации и SEO)
    CNAME                        — кастомный домен для GitHub Pages
    icons/

    images/                      — локальные изображения артистов для флип-карточек (используются через __PUBLIC_PATH__)

  src/                           — исходники
    index.tsx                    — entrypoint: RouterProvider + восстановление маршрута для GH Pages
    typings.d.ts                 — декларации глобальных констант (__PUBLIC_PATH__)

    app/                         — app-shell и маршрутизация
      App.tsx                    — layout: NavBar + Outlet + Footer + ScrollToTop
      routes.tsx                 — массив роутов для createBrowserRouter (+ lazy pages, включая special-project и styleguide)

    pages/                       — страницы (в каждой .tsx, .lazy.tsx, .module.scss)
      guide/                     — главная страница
      article/                   — страница отдельной статьи (`/articles/:slug`)
      test/                      — страница отдельного теста (`/tests/:id`)
      special-project/           — спецпроект с интервью и pixi-градиентом
      styleguide/                — внутренняя витрина компонентов/стилей

    components/                  — UI-компоненты (Atomic-ish)
      atoms/
      molecules/
      collections/
      organisms/
      super-organisms/
      quarks/
      wrappers/

    assets/                      — “вшитые” в бандл ассеты/данные
      images/
        Q_HeroEffect.png         — изображение эффект для hero
      fonts/
      data/                      — контент в JSON (частично со ссылками на внешнее медиа)
        articles/
          articlesInfo.json      — список статей (превью + внешние ссылки на JSON контента)
        tests/
          tests.json             — база вопросов/картинок/результатов тестов
        flipCards/
          flipCards.json         — данные для флип-карточек
        guideArtistInfo/
          guideArtistInfo.json   — данные для гида по артистам

    shared/
      api/
        http.ts                  — HTTP-клиент/обёртки
        articles.ts              — загрузка/получение данных статей (используются в getArticleContent() в /pages/article Article.tsx)
      constants/
        videoGuideMap.ts         — ссылки на внешние видео (фоны на сайте)
      types/
        articles.ts              — типы для статей
        cards.ts                 — типы для карточек
        test.ts                  — типы для тестов
      utils/
        ScrollToTop.tsx          — автоскролл наверх при смене роутов
        filterArticles.ts        — фильтрация/поиск по статьям
        calcArticleSide.ts       — утилита для блоков статьи (по очереди с разных сторон)
        calcTestCardSize.ts      — выбор размера карточек (три вида, используется в статьях и тестах)
        checkResult.ts           — внешние картинки good/ok/bad для результата
        specialProjectGradient.ts — утилиты для canvas-градиента спецпроекта (grain, seeded rng, clamp)

    styles/                      — глобальные стили
      global.scss                — подключается в entry, общий интер всех файлов стилей
      reset.scss
      config.scss                — переменные/scss конфиг — переменные из него по всему scss коду каждого комопнента
      fonts.scss
      style.scss                 — общий набор стилей (без привязки к компоненту)

  docs/                          — сборка бандла + деплой директория для GitHub Pages (генерируется)
```
