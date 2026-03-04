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

export interface BigArticleImg {
  big_img: string;
  img_footer: string;
}

export interface SideArticleImg {
  side_img: string;
  img_footer: string;
}

export type ArticleParagraph = string | BigArticleImg;

export type ArticleSide = 'left' | 'right';

export interface ArticleBlockContent {
  heading: string;
  paragraphs: ArticleParagraph[];
  side_imgs: SideArticleImg[];
}

export type ArticleContent = ArticleBlockContent[];
