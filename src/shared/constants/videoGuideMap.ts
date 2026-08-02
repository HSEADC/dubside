type videosGuideMapType = Record<string, string>;

const VIDEO_BASE_URL = 'https://dunchek-test-bucket.s3-website.cloud.ru/dubside/videos';
const getVideoUrl = (name: string) => `${VIDEO_BASE_URL}/${name}.mp4`;

export const videosGuideMap: videosGuideMapType = {
  hero: getVideoUrl('hero'),
  cards: getVideoUrl('hero'),
  about: getVideoUrl('hero'),
  articles: getVideoUrl('hero'),
  styleguide: getVideoUrl('hero'),
  kendrick: getVideoUrl('kendrick'),
  drake: getVideoUrl('drake'),
  '50cent': getVideoUrl('50cent'),
  carti: getVideoUrl('carti'),
  eminem: getVideoUrl('eminem'),
  future: getVideoUrl('future'),
  jayz: getVideoUrl('jayz'),
  jcole: getVideoUrl('jcole'),
  kanye: getVideoUrl('kanye'),
  nicki: getVideoUrl('nicki'),
  travis: getVideoUrl('travis'),
  wayne: getVideoUrl('wayne')
};
