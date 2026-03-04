import { ArticleSide } from '../types/articles';

export function calcArticleSide(i: number): ArticleSide {
  if (i % 2 !== 0) {
    return 'right';
  }
  return 'left';
}
