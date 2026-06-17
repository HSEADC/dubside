import { lazy } from 'react';

export const LazySpecialProject = lazy(
  () => import('@/pages/special-project/SpecialProject')
);
