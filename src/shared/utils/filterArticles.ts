import { Article } from '../types/articles';

const filterByTag = (articles: Article[], tags: string[]) =>
  tags.length === 0 ? articles : articles.filter((a) => tags.some((t) => a.tags.includes(t)));

const filterByInput = (articles: Article[], query: string): Article[] => {
  const q = query.toLocaleLowerCase().trim();
  if (!q) return articles;

  return articles.filter(
    (a) =>
      a.title.toLocaleLowerCase().includes(q) ||
      a.paragraph.toLocaleLowerCase().includes(q) ||
      a.tags.some((t) => t.includes(q))
  );
};

export const filterArticles = (articles: Article[], tags: string[], query: string): Article[] => {
  return filterByInput(filterByTag(articles, tags), query);
};
