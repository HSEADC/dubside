const resultGood =
  'https://dunchek-test-bucket.s3-website.cloud.ru/dubside/results/result_good.png';
const resultOk = 'https://dunchek-test-bucket.s3-website.cloud.ru/dubside/results/result_ok.png';
const resultBad = 'https://dunchek-test-bucket.s3-website.cloud.ru/dubside/results/result_bad.png';

const checkResult = (count: number, length: number) => {
  const bord = Math.floor(length / 3);
  let p = '';
  let img = '';
  let h3 = '';
  if (count <= bord) {
    p = 'Прямо вау! Вам точно стоит что-нибудь у нас почитать и вернуться к тесту позже)';
    img = resultBad;
    h3 = 'Ну, это было очень плохо';
  } else if (count <= bord + bord) {
    p =
      'Вы действительно что-то знаете, но до жесточайшего свега вам еще далеко. Но ничего, подтянете на наших материалах)';
    img = resultOk;
    h3 = 'Вполне себе)';
  } else {
    p =
      'Вы учились на факультете хип-хопа, не иначе. Мы в шоке. Попробуйте и другие тесты, возможно они покажутся вам не такими легкими)';
    img = resultGood;
    h3 = 'Обалдеть';
  }
  return [p, img, h3];
};

export default checkResult;
