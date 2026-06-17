import { useEffect, useRef } from 'react';
import * as PIXI from 'pixi.js';
import { DisplacementFilter } from '@pixi/filter-displacement';
import classes from './Q_SpecialProjectGradient.module.scss';
import { addGrain, clamp01, seededRng } from '@/shared/utils/specialProjectGradient';

// const COLORS = {
//   color1: '#000000',
//   color2: '#3a3100',
//   color3: '#000000',
//   // color3: '#ffc800',
//   color4: '#1c1700',
//   color5: '#271d00',
//   background: '#000000'
// } as const;

const COLORS = {
  color1: '#ffaa00',
  color2: '#3a2500',
  color3: '#000000',
  // color3: '#ffc800',
  color4: '#1c1400',
  color5: '#ffaa00',
  background: '#000000'
} as const;

const Q_SpecialProjectGradient = () => {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const root = rootRef.current;

    if (!root) {
      return undefined;
    }

    const gradCanvas = document.createElement('canvas');
    gradCanvas.width = 512;
    gradCanvas.height = 512;

    const noiseCanvas = document.createElement('canvas');
    noiseCanvas.width = 512;
    noiseCanvas.height = 512;

    const maskCanvas = document.createElement('canvas');
    maskCanvas.width = 512;
    maskCanvas.height = 512;

    const overlayCanvas = document.createElement('canvas');
    overlayCanvas.width = 512;
    overlayCanvas.height = 512;

    const app = new PIXI.Application({
      resizeTo: window,
      antialias: true,
      backgroundAlpha: 0,
      autoDensity: false,
      resolution: 1,
      powerPreference: 'high-performance'
    });

    app.view.style.width = '100%';
    app.view.style.height = '100%';
    app.view.style.display = 'block';
    root.appendChild(app.view);

    const scene = new PIXI.Container();
    const hud = new PIXI.Container();
    app.stage.addChild(scene);
    app.stage.addChild(hud);

    const background = new PIXI.Graphics();
    scene.addChild(background);

    let gradientSprite: PIXI.Sprite | null = null;
    let displacementSprite: PIXI.Sprite | null = null;
    let displacementFilter: DisplacementFilter | null = null;
    let maskSprite: PIXI.Sprite | null = null;
    let overlaySprite: PIXI.Sprite | null = null;

    let displacementCurrent = 0;
    let displacementTarget = 0;
    let seedCurrent = 0;
    let seedTarget = 0;

    let lastRebuildAt = 0;
    const rebuildIntervalMs = 30;

    let displacementShiftY = 0;
    let displacementShiftYTarget = 0;
    const displacementShiftSmooth = 0.07;
    let displacementNy = 0.5;
    const displacementOverscanY = 3.5;
    let displacementShiftMax = 0;
    const displacementShiftAmount = 0.8;
    let displacementBaseX = 0;
    let displacementBaseY = 0;
    const displacementTextureMaxSize = 2000;

    const drawBackground = () => {
      background.clear();
      background.beginFill(PIXI.utils.string2hex(COLORS.background), 1);
      background.drawRect(0, 0, app.renderer.width, app.renderer.height);
      background.endFill();
    };

    const buildGradient = (seed: number) => {
      const ctx = gradCanvas.getContext('2d', { willReadFrequently: false });

      if (!ctx) {
        return;
      }

      const width = gradCanvas.width;
      const height = gradCanvas.height;
      const t = (seed + 1) / 2;
      const angle = seed * (Math.PI / 5);
      const length = Math.sqrt(width * width + height * height);
      const centerX = width / 2;
      const centerY = height / 2;
      const normalX = Math.cos(angle);
      const normalY = Math.sin(angle);
      const perpendicularX = -normalY;
      const perpendicularY = normalX;
      const offsetAmount = (t - 0.5) * (length * 0.24);
      const offsetX = perpendicularX * offsetAmount;
      const offsetY = perpendicularY * offsetAmount;
      const halfLength = length * 0.55;
      const x0 = centerX - normalX * halfLength + offsetX;
      const y0 = centerY - normalY * halfLength + offsetY;
      const x1 = centerX + normalX * halfLength + offsetX;
      const y1 = centerY + normalY * halfLength + offsetY;
      const gradient = ctx.createLinearGradient(x0, y0, x1, y1);
      const wobble = 0.2;

      let stop1 = 0.05 + wobble * (t - 0.5) * 0.6;
      let stop2 = 0.24 + wobble * (0.5 - t) * 0.7;
      let stop3 = 0.5 + wobble * (t - 0.5) * 0.8;
      let stop4 = 0.7 + wobble * (t - 0.5) * 0.35;
      let stop5 = 1;

      stop1 = clamp01(stop1);
      stop2 = Math.max(stop1 + 0.001, clamp01(stop2));
      stop3 = Math.max(stop2 + 0.001, clamp01(stop3));
      stop4 = Math.max(stop3 + 0.001, clamp01(stop4));
      stop5 = Math.max(stop4 + 0.001, clamp01(stop5));

      gradient.addColorStop(stop1, COLORS.color1);
      gradient.addColorStop(stop2, COLORS.color2);
      gradient.addColorStop(stop3, COLORS.color3);
      gradient.addColorStop(stop4, COLORS.color4);
      gradient.addColorStop(stop5, COLORS.color5);

      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      if (!gradientSprite) {
        const baseTexture = PIXI.BaseTexture.from(gradCanvas);
        gradientSprite = new PIXI.Sprite(new PIXI.Texture(baseTexture));
        gradientSprite.anchor.set(0, 0);
      } else {
        gradientSprite.texture.baseTexture.update();
      }
    };

    const buildEdgeMask = () => {
      const ctx = maskCanvas.getContext('2d');

      if (!ctx || !gradientSprite) {
        return;
      }

      const width = maskCanvas.width;
      const height = maskCanvas.height;
      const gradient = ctx.createRadialGradient(
        width / 2,
        height / 2,
        width * 0.18,
        width / 2,
        height / 2,
        width * 0.58
      );

      gradient.addColorStop(0, 'rgba(255,255,255,1)');
      gradient.addColorStop(0.5, 'rgba(255,255,255,1)');
      gradient.addColorStop(1, 'rgba(255,255,255,0)');

      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      if (!maskSprite) {
        const baseTexture = PIXI.BaseTexture.from(maskCanvas);
        maskSprite = new PIXI.Sprite(new PIXI.Texture(baseTexture));
        maskSprite.anchor.set(0, 0);
        gradientSprite.mask = maskSprite;
        scene.addChild(maskSprite);
      } else {
        maskSprite.texture.baseTexture.update();
      }
    };

    const buildOverlayTexture = () => {
      const ctx = overlayCanvas.getContext('2d', { willReadFrequently: true });

      if (!ctx) {
        return;
      }

      const width = overlayCanvas.width;
      const height = overlayCanvas.height;

      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = 'rgba(255,255,255,0.01)';
      ctx.fillRect(0, 0, width, height);
      addGrain(ctx, width, height, seededRng(1337));

      if (!overlaySprite) {
        const baseTexture = PIXI.BaseTexture.from(overlayCanvas);
        baseTexture.wrapMode = PIXI.WRAP_MODES.CLAMP;
        baseTexture.scaleMode = PIXI.SCALE_MODES.LINEAR;

        overlaySprite = new PIXI.Sprite(new PIXI.Texture(baseTexture));
        overlaySprite.anchor.set(0, 0);
        overlaySprite.alpha = 0.18;
        overlaySprite.blendMode = PIXI.BLEND_MODES.NORMAL;
      } else {
        overlaySprite.texture.baseTexture.update();
      }
    };

    const buildDisplacement = (seed: number) => {
      const rendererWidth = app.renderer.width;
      const rendererHeight = app.renderer.height;
      const scale = Math.min(
        1,
        displacementTextureMaxSize / Math.max(rendererWidth, rendererHeight)
      );
      const width = Math.max(256, Math.floor(rendererWidth * scale));
      const height = Math.max(256, Math.floor(rendererHeight * scale));

      if (noiseCanvas.width !== width || noiseCanvas.height !== height) {
        noiseCanvas.width = width;
        noiseCanvas.height = height;
      }

      const ctx = noiseCanvas.getContext('2d', { willReadFrequently: true });

      if (!ctx) {
        return;
      }

      const rng = seededRng(50000 + Math.floor((seed + 1) * 100000));
      const imageData = ctx.createImageData(width, height);
      const t = (seed + 1) / 2;
      const frequency1 = 0.8 + 1.2 * t;
      const frequency2 = 0.8 + 1.2 * (1 - t);
      const phase = rng() * Math.PI * 2;

      for (let y = 0; y < height; y += 1) {
        for (let x = 0; x < width; x += 1) {
          const index = (y * width + x) * 4;
          const normalizedX = x / width;
          const normalizedY = y / height;
          const value1 = Math.sin(
            (normalizedX * frequency1 + normalizedY * 0.7 * frequency1) * Math.PI * 2 + phase
          );
          const value2 = Math.cos(
            (normalizedY * frequency2 - normalizedX * 0.6 * frequency2) * Math.PI * 2 - phase * 0.7
          );
          const mixed = (value1 * 0.9 + value2 * 0.1) * 0.5 + 0.5;
          const red = clamp01(mixed + (rng() - 0.5) * 0.12);
          const green = clamp01(1 - mixed + (rng() - 0.5) * 0.12);

          imageData.data[index] = (red * 255) | 0;
          imageData.data[index + 1] = (green * 255) | 0;
          imageData.data[index + 2] = 128;
          imageData.data[index + 3] = 255;
        }
      }

      ctx.putImageData(imageData, 0, 0);

      if (!displacementSprite) {
        const baseTexture = PIXI.BaseTexture.from(noiseCanvas);
        baseTexture.wrapMode = PIXI.WRAP_MODES.CLAMP;
        baseTexture.scaleMode = PIXI.SCALE_MODES.LINEAR;

        displacementSprite = new PIXI.Sprite(new PIXI.Texture(baseTexture));
        displacementSprite.anchor.set(0, 0);
        displacementSprite.alpha = 0;
      } else {
        const baseTexture = displacementSprite.texture.baseTexture;
        baseTexture.wrapMode = PIXI.WRAP_MODES.CLAMP;
        baseTexture.scaleMode = PIXI.SCALE_MODES.LINEAR;
        baseTexture.update();
      }
    };

    const setDisplacementStrength = (displacement: number) => {
      if (!displacementFilter) {
        return;
      }

      const normalized = Math.max(0, Math.min(5, displacement)) / 5;
      const shaped = Math.pow(normalized, 1.01);
      const maxX = 1800;
      const maxY = 500;

      displacementFilter.scale.set(shaped * maxX, shaped * maxY);
    };

    const layoutOverlayToScreen = () => {
      if (!overlaySprite) {
        return;
      }

      const width = app.renderer.width;
      const height = app.renderer.height;

      overlaySprite.position.set(0, 0);
      overlaySprite.width = width;
      overlaySprite.height = height;
      overlaySprite.roundPixels = true;
    };

    const layoutToScreen = () => {
      if (!gradientSprite) {
        return;
      }

      const width = app.renderer.width;
      const height = app.renderer.height;
      const gradientWidth = gradientSprite.texture.width || 1;
      const gradientHeight = gradientSprite.texture.height || 1;
      const gradientScale = Math.max(width / gradientWidth, height / gradientHeight);

      gradientSprite.scale.set(gradientScale);
      gradientSprite.x = (width - gradientWidth * gradientScale) / 2;
      gradientSprite.y = (height - gradientHeight * gradientScale) / 2;

      if (displacementSprite) {
        const displacementWidth = displacementSprite.texture.width || 1;
        const displacementHeight = displacementSprite.texture.height || 1;
        const displacementScaleX = width / displacementWidth;
        const displacementScaleY = (height * displacementOverscanY) / displacementHeight;

        displacementSprite.scale.set(displacementScaleX, displacementScaleY);

        const scaledHeight = displacementHeight * displacementScaleY;
        const extra = Math.max(0, scaledHeight - height);

        displacementBaseX = 0;
        displacementBaseY = -extra / 2;
        displacementShiftMax = extra / 2;
      }

      drawBackground();

      if (maskSprite) {
        const maskWidth = maskSprite.texture.width || 1;
        const maskHeight = maskSprite.texture.height || 1;
        const maskScale = Math.max(width / maskWidth, height / maskHeight);

        maskSprite.scale.set(maskScale);
        maskSprite.position.set(
          (width - maskWidth * maskScale) / 2,
          (height - maskHeight * maskScale) / 2
        );
      }
    };

    const applyPointerXY = (x: number, y: number) => {
      const width = Math.max(1, window.innerWidth);
      const height = Math.max(1, window.innerHeight);
      const normalizedX = Math.min(1, Math.max(0, x / width));
      const normalizedY = Math.min(1, Math.max(0, y / height));

      seedTarget = -1 + normalizedY * 2;
      displacementTarget = 0.8 + normalizedX * 4.2;
      displacementNy = normalizedY;
    };

    const onPointerMove = (event: PointerEvent) => {
      applyPointerXY(event.clientX, event.clientY);
    };

    const onTouchStart = (event: TouchEvent) => {
      const touch = event.touches[0];

      if (!touch) {
        return;
      }

      applyPointerXY(touch.clientX, touch.clientY);
    };

    const onTouchMove = (event: TouchEvent) => {
      const touch = event.touches[0];

      if (!touch) {
        return;
      }

      applyPointerXY(touch.clientX, touch.clientY);
    };

    const onResize = () => {
      layoutToScreen();
      layoutOverlayToScreen();
    };

    buildGradient(seedCurrent);
    buildDisplacement(seedCurrent);

    if (gradientSprite && displacementSprite) {
      displacementFilter = new DisplacementFilter(displacementSprite);
      setDisplacementStrength(displacementCurrent);
      gradientSprite.filters = [displacementFilter];
      scene.addChild(gradientSprite);
      scene.addChild(displacementSprite);
    }

    buildEdgeMask();
    buildOverlayTexture();

    if (overlaySprite) {
      hud.addChild(overlaySprite);
    }

    drawBackground();
    layoutToScreen();
    layoutOverlayToScreen();

    app.ticker.add(() => {
      displacementCurrent += (displacementTarget - displacementCurrent) * 0.1;
      setDisplacementStrength(displacementCurrent);

      if (displacementSprite) {
        const signedY = (displacementNy - 0.5) * 2;
        displacementShiftYTarget = signedY * displacementShiftMax * displacementShiftAmount;
        displacementShiftY +=
          (displacementShiftYTarget - displacementShiftY) * displacementShiftSmooth;

        const clampedShift = Math.max(
          -displacementShiftMax,
          Math.min(displacementShiftMax, displacementShiftY)
        );
        displacementSprite.x = displacementBaseX;
        displacementSprite.y = displacementBaseY + clampedShift;
      }

      const normalizedX = Math.max(0, Math.min(1, displacementTarget / 5));
      const seedSmoothing = 0.12 + (0.03 - 0.12) * normalizedX;
      seedCurrent += (seedTarget - seedCurrent) * seedSmoothing;

      const now = performance.now();

      if (now - lastRebuildAt >= rebuildIntervalMs) {
        lastRebuildAt = now;
        buildGradient(seedCurrent);
        layoutToScreen();
      }
    });

    const isCoarsePointer =
      typeof window.matchMedia === 'function' && window.matchMedia('(pointer: coarse)').matches;

    window.addEventListener('pointermove', onPointerMove, { passive: true });

    if (isCoarsePointer) {
      window.addEventListener('touchstart', onTouchStart, { passive: true });
      window.addEventListener('touchmove', onTouchMove, { passive: true });
    }

    window.addEventListener('resize', onResize, { passive: true });

    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('resize', onResize);

      app.destroy(true, {
        children: true,
        texture: true,
        baseTexture: true
      });
    };
  }, []);

  return <div ref={rootRef} className={classes.gradient} aria-hidden="true" />;
};

export default Q_SpecialProjectGradient;
