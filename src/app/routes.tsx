import { Suspense } from 'react';
import App from './App';
import { LazyGuide } from '@/pages/guide/Guide.lazy';
import { LazyAbout } from '@/pages/about/About.lazy';
import { LazyTests } from '@/pages/tests/Tests.lazy';
import { LazyArticles } from '@/pages/articles/Articles.lazy';
import { LazyCards } from '@/pages/cards/Cards.lazy';
import { LazyArticle } from '@/pages/article/Article.lazy';
import { LazyTest } from '@/pages/test/Test.lazy';

const AppRoutes = [
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <LazyGuide />
          </Suspense>
        )
      },
      {
        path: '/about',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <LazyAbout />
          </Suspense>
        )
      },
      {
        path: '/tests',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <LazyTests />
          </Suspense>
        )
      },
      {
        path: '/articles',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <LazyArticles />
          </Suspense>
        )
      },
      {
        path: '/cards',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <LazyCards />
          </Suspense>
        )
      },
      {
        path: '/articles/:slug',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <LazyArticle />
          </Suspense>
        )
      },
      {
        path: '/tests/:id',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <LazyTest />
          </Suspense>
        )
      }
    ]
  }
];

export default AppRoutes;
