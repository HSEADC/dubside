import { fetchJson } from '@/shared/api/http';
import { ArticleContent } from '../types/articles';

export function getArticleContent(url: string, signal?: AbortSignal) {
  return fetchJson<ArticleContent>(url, signal);
}
