export function clamp01(value: number) {
  return Math.max(0, Math.min(1, value));
}

export function seededRng(seed: number) {
  let t = seed >>> 0;

  return function next() {
    t += 0x6d2b79f5;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r ^= r + Math.imul(r ^ (r >>> 7), 61 | r);

    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}

export function addGrain(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  rng: () => number
) {
  const imageData = ctx.getImageData(0, 0, width, height);
  const { data } = imageData;

  for (let index = 0; index < data.length; index += 4) {
    const noise = (rng() - 0.5) * 8;

    data[index] = Math.max(0, Math.min(255, data[index] + noise));
    data[index + 1] = Math.max(0, Math.min(255, data[index + 1] + noise));
    data[index + 2] = Math.max(0, Math.min(255, data[index + 2] + noise));
  }

  ctx.putImageData(imageData, 0, 0);
}
