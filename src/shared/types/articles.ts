export interface Article {
  id: number;
  title: string;
  paragraph: string;
  slug: string;
  date: string;
  timing: string;
  tags: string[];
  img: string;
  contentLink: string;
}

interface ArticleImg {
  img: string;
  footer: string;
}

type ArticleParagraph = string | ArticleImg;

interface ArticleBlockContent {
  heading: string;
  paragraphs: ArticleParagraph[];
  side_imgs: ArticleImg[];
}

export type ArticleContent = ArticleBlockContent[];
