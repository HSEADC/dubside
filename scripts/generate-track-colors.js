const fs = require('fs/promises');
const path = require('path');
const sharp = require('sharp');

const rootDir = path.resolve(__dirname, '..');
const flipCardsPath = path.join(rootDir, 'src', 'assets', 'data', 'flipCards', 'flipCards.json');
const guideArtistInfoPath = path.join(
  rootDir,
  'src',
  'assets',
  'data',
  'guideArtistInfo',
  'guideArtistInfo.json'
);
const outputDir = path.join(rootDir, 'src', 'assets', 'data', 'trackColors');
const outputPath = path.join(outputDir, 'trackColors.json');

const defaultColor = [100, 100, 100];
const defaultColorValue = defaultColor.join(' ');
const fallbackFetchTimeoutMs = 5000;
const fetchTimeoutMs = Number(process.env.TRACK_COLOR_TIMEOUT_MS ?? fallbackFetchTimeoutMs);
const shouldForce = process.argv.includes('--force');

function isTooDarkOrLight(rgb, { dark = 0.3, light = 0.9 } = {}) {
  const [r, g, b] = rgb;
  const luminance = (0.2 * r + 0.7 * g + 0.1 * b) / 255;
  return luminance < dark || luminance > light;
}

function correctBrightness(rgb, threshold = 0.4) {
  const [r, g, b] = rgb;
  const luminance = (0.2 * r + 0.7 * g + 0.1 * b) / 255;
  if (luminance < threshold) return rgb.map((value) => Math.min(value + 55, 255));
  return rgb;
}

function normalizeRgb(rgb) {
  const rounded = rgb.map((value) => Math.round(value));
  return isTooDarkOrLight(rounded) ? correctBrightness(rounded) : rounded;
}

function collectImageUrlsFromTrack(track, urls) {
  if (track && typeof track.img === 'string') {
    urls.add(track.img);
  }
}

function collectImageUrls(data) {
  const urls = new Set();

  Object.values(data).forEach((artist) => {
    if (!artist || typeof artist !== 'object') return;

    if (Array.isArray(artist.songs)) {
      artist.songs.forEach((track) => collectImageUrlsFromTrack(track, urls));
    }

    if (Array.isArray(artist.tracks)) {
      artist.tracks.forEach((track) => collectImageUrlsFromTrack(track, urls));
    }

    collectImageUrlsFromTrack(artist.album, urls);
  });

  return urls;
}

async function readJson(filePath) {
  const raw = await fs.readFile(filePath, 'utf8');
  return JSON.parse(raw);
}

async function readExistingColors() {
  try {
    return await readJson(outputPath);
  } catch {
    return {};
  }
}

async function fetchBuffer(url) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), fetchTimeoutMs);

  try {
    const response = await fetch(url, { signal: controller.signal });
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    return Buffer.from(await response.arrayBuffer());
  } finally {
    clearTimeout(timeoutId);
  }
}

async function getImageColor(url) {
  const imageBuffer = await fetchBuffer(url);
  const { dominant } = await sharp(imageBuffer).resize(64, 64, { fit: 'inside' }).stats();
  const rgb = normalizeRgb([dominant.r, dominant.g, dominant.b]);
  return rgb.join(' ');
}

async function main() {
  const [flipCards, guideArtistInfo, existingColors] = await Promise.all([
    readJson(flipCardsPath),
    readJson(guideArtistInfoPath),
    readExistingColors()
  ]);

  const urls = new Set([...collectImageUrls(flipCards), ...collectImageUrls(guideArtistInfo)]);
  const sortedUrls = [...urls].sort();
  const colors = {};

  for (const [index, url] of sortedUrls.entries()) {
    if (!shouldForce && existingColors[url] && existingColors[url] !== defaultColorValue) {
      colors[url] = existingColors[url];
      console.log(`${index + 1}/${sortedUrls.length} cached ${colors[url]} ${url}`);
      continue;
    }

    try {
      colors[url] = await getImageColor(url);
      console.log(`${index + 1}/${sortedUrls.length} ${colors[url]} ${url}`);
    } catch (error) {
      colors[url] = defaultColorValue;
      console.warn(`${index + 1}/${sortedUrls.length} fallback ${url}: ${error.message}`);
    }
  }

  await fs.mkdir(outputDir, { recursive: true });
  await fs.writeFile(outputPath, `${JSON.stringify(colors, null, 2)}\n`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
