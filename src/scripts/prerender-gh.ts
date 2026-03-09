import fs from 'fs';
import path from 'path';
import Module from 'module';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import {
  StaticRouterProvider,
  createStaticHandler,
  createStaticRouter,
  type RouteObject
} from 'react-router';

// -----------------------------------------------------------------------------
// Purpose:
// - Run AFTER `yarn build:gh`
// - Takes the generated `docs/index.html` as a template
// - Server-renders a few routes into <div id="root">...</div>
// - Writes:
//   - docs/index.html
//   - docs/about/index.html
//   - docs/articles/index.html
//   - docs/cards/index.html
//   - docs/tests/index.html
//
// Run:
//   yarn ts-node src/scripts/prerender-gh.ts
// -----------------------------------------------------------------------------

const projectRoot = path.resolve(__dirname, '../..');
const srcRoot = path.join(projectRoot, 'src');
const outDir = path.join(projectRoot, 'docs');

// GitHub Pages project site base path (https://hseadc.github.io/dubside/)
const basename = '/dubside';

const prerenderPaths = ['/', '/about', '/articles', '/cards', '/tests'] as const;

function installAtAliasHook() {
  const modAny = Module as unknown as {
    _resolveFilename: (
      request: string,
      parent: unknown,
      isMain: boolean,
      options: unknown
    ) => string;
  };

  const originalResolveFilename = modAny._resolveFilename;

  modAny._resolveFilename = function (
    request: string,
    parent: unknown,
    isMain: boolean,
    options: unknown
  ) {
    if (request === '@') {
      request = srcRoot;
    } else if (request.startsWith('@/')) {
      request = path.join(srcRoot, request.slice(2));
    }
    return originalResolveFilename.call(this, request, parent, isMain, options);
  };
}

function installAssetStubs() {
  const reqAny = require as unknown as {
    extensions: Record<string, (module: NodeModule, filename: string) => void>;
  };

  const exportEmptyObject = (module: NodeModule) => {
    (module as unknown as { exports: unknown }).exports = {};
  };

  const exportFilename = (module: NodeModule, filename: string) => {
    (module as unknown as { exports: unknown }).exports = filename;
  };

  for (const ext of ['.css', '.scss', '.sass', '.less']) {
    reqAny.extensions[ext] = exportEmptyObject;
  }

  for (const ext of [
    '.svg',
    '.png',
    '.jpg',
    '.jpeg',
    '.webp',
    '.gif',
    '.mp4',
    '.webm',
    '.woff',
    '.woff2',
    '.ttf',
    '.eot'
  ]) {
    reqAny.extensions[ext] = exportFilename;
  }
}

function loadTemplateHtml(): string {
  const templatePath = path.join(outDir, 'index.html');
  if (!fs.existsSync(templatePath)) {
    throw new Error(`Template not found: ${templatePath}. Run \`yarn build:gh\` first.`);
  }
  return fs.readFileSync(templatePath, 'utf8');
}

function injectIntoRoot(templateHtml: string, appHtml: string): string {
  const rootRe = /<div\s+id=["']root["']\s*>[\s\S]*?<\/div>/i;
  if (!rootRe.test(templateHtml)) {
    throw new Error('Cannot find `<div id="root">...</div>` in docs/index.html');
  }
  return templateHtml.replace(rootRe, `<div id="root">${appHtml}</div>`);
}

function routePathToOutFile(routePath: string): string {
  if (routePath === '/' || routePath === '') return path.join(outDir, 'index.html');

  const clean = routePath.replace(/\/+$/, '').replace(/^\/+/, '');
  return path.join(outDir, clean, 'index.html');
}

function ensureDirForFile(filePath: string) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
}

function makeRequestUrl(routePath: string) {
  const base = 'http://prerender.local';
  const pathname = `${basename}${routePath}`.replace(/\/{2,}/g, '/');
  return `${base}${pathname}`;
}

async function renderRouteToString(routes: RouteObject[], routePath: string): Promise<string> {
  if (typeof (globalThis as unknown as { Request?: unknown }).Request !== 'function') {
    throw new Error(
      'Global Request is missing. Use Node.js 18+ (or run in an environment with fetch/Request).'
    );
  }

  const { query, dataRoutes } = createStaticHandler(routes, { basename });
  const request = new Request(makeRequestUrl(routePath));
  const context = await query(request);

  if (context instanceof Response) {
    throw new Error(
      `Static handler returned a Response for "${routePath}" (status ${context.status})`
    );
  }

  const router = createStaticRouter(dataRoutes, context);
  return ReactDOMServer.renderToString(
    React.createElement(StaticRouterProvider, { router, context })
  );
}

async function main() {
  installAtAliasHook();
  installAssetStubs();

  const templateHtml = loadTemplateHtml();

  // Import AFTER hooks are installed (alias + asset stubs)
  const { default: App } = await import('../app/App');
  const { default: Guide } = await import('../pages/guide/Guide');
  const { default: About } = await import('../pages/about/About');
  const { default: Articles } = await import('../pages/articles/Articles');
  const { default: Cards } = await import('../pages/cards/Cards');
  const { default: Tests } = await import('../pages/tests/Tests');

  const routes: RouteObject[] = [
    {
      path: '/',
      element: React.createElement(App),
      children: [
        { index: true, element: React.createElement(Guide) },
        { path: 'about', element: React.createElement(About) },
        { path: 'tests', element: React.createElement(Tests) },
        { path: 'articles', element: React.createElement(Articles) },
        { path: 'cards', element: React.createElement(Cards) }
      ]
    }
  ];

  for (const routePath of prerenderPaths) {
    const appHtml = await renderRouteToString(routes, routePath);
    const finalHtml = injectIntoRoot(templateHtml, appHtml);
    const outFile = routePathToOutFile(routePath);
    ensureDirForFile(outFile);
    fs.writeFileSync(outFile, finalHtml, 'utf8');
    console.log(`prerendered ${routePath} -> ${path.relative(projectRoot, outFile)}`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
