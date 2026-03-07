export interface Track {
  name: string;
  footer: string;
  img: string;
  link: string;
}

export interface SingerCard {
  name: string;
  points: string[];
  paragraph: string;
  songs: Track[];
}

export type FlipCardsMap = Record<string, SingerCard>;
