type Size = 'mini' | 'mid' | 'max';

const calcTestCardSize = (id: number): Size => {
  let number = id;
  if (number > 4) number = number % 5;
  let size: Size;
  if (number === 4) {
    size = 'max';
  } else if (number === 1 || number === 2) {
    size = 'mini';
  } else {
    size = 'mid';
  }
  return size;
};

export default calcTestCardSize;
