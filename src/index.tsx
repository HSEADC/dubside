import ReactDOM from 'react-dom/client';
import { createBrowserRouter } from 'react-router';
import { RouterProvider } from 'react-router';

import '@/styles/global.scss';

import AppRoutes from './app/routes';

const root = document.getElementById('root');

if (!root) {
  throw new Error('root not found');
}

let basename = '';
if (window.location.pathname.startsWith('/dubside/')) basename = '/dubside';

// `public/404.html` redirects unknown paths to `/dubside/?p=<encoded_route>`
// so we restore the original path before React Router boots.
if (basename === '/dubside') {
  const params = new URLSearchParams(window.location.search);
  const p = params.get('p');
  if (p) {
    const decoded = decodeURIComponent(p);
    window.history.replaceState(null, '', decoded);
  }
}

const router = createBrowserRouter(AppRoutes, { basename });

ReactDOM.createRoot(root).render(<RouterProvider router={router} />);
