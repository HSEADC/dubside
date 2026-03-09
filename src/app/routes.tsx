import { Suspense } from 'react';
import App from './App';
import { LazyGuide } from '@/pages/guide/Guide.lazy';
import { LazyAbout } from '@/pages/about/About.lazy';
import { LazyTests } from '@/pages/tests/Tests.lazy';
import { LazyArticles } from '@/pages/articles/Articles.lazy';
import { LazyCards } from '@/pages/cards/Cards.lazy';
import { LazyArticle } from '@/pages/article/Article.lazy';
import { LazyTest } from '@/pages/test/Test.lazy';
import A_Loader from '@/components/atoms/A_Loader/A_Loader';

const AppRoutes = [
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: (
          <Suspense fallback={<A_Loader />}>
            <LazyGuide />
          </Suspense>
        )
      },
      {
        path: '/about',
        element: (
          <Suspense fallback={<A_Loader />}>
            <LazyAbout />
          </Suspense>
        )
      },
      {
        path: '/tests',
        element: (
          <Suspense fallback={<A_Loader />}>
            <LazyTests />
          </Suspense>
        )
      },
      {
        path: '/articles',
        element: (
          <Suspense fallback={<A_Loader />}>
            <LazyArticles />
          </Suspense>
        )
      },
      {
        path: '/cards',
        element: (
          <Suspense fallback={<A_Loader />}>
            <LazyCards />
          </Suspense>
        )
      },
      {
        path: '/articles/:slug',
        element: (
          <Suspense fallback={<A_Loader />}>
            <LazyArticle />
          </Suspense>
        )
      },
      {
        path: '/tests/:id',
        element: (
          <Suspense fallback={<A_Loader />}>
            <LazyTest />
          </Suspense>
        )
      }
    ]
  }
];

export default AppRoutes;
