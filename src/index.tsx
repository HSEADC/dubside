import ReactDOM from 'react-dom/client';
import { createBrowserRouter } from 'react-router';
import { RouterProvider } from 'react-router';
import { Suspense } from 'react';

import '@/styles/global.scss';

import App from '@/pages/App';
import { LazyAbout } from '@/pages/about/About.lazy';
import { LazyTests } from '@/pages/tests/Tests.lazy';
import { LazyArticles } from '@/pages/articles/Articles.lazy';
import { LazyGuide } from './pages/guide/Guide.lazy';
import { LazyTest } from './pages/test/Test.lazy';

const root = document.getElementById('root');

if (!root) {
  throw new Error('root now found');
}

const router = createBrowserRouter([
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
        path: '/tests/:id',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <LazyTest />
          </Suspense>
        )
      }
    ]
  }
]);

ReactDOM.createRoot(root).render(<RouterProvider router={router} />);
