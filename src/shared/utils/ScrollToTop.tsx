import { useLayoutEffect } from 'react';
import { useLocation } from 'react-router';

export function ScrollToTop(): null {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    // чтобы скролл происходил до отрисовки кадра
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [pathname]);

  return null;
}
