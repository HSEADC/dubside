import classes from '@/components/molecules/M_Track/M_Track.module.scss';
import { getColor, getSwatches } from 'colorthief';
import React, { useState } from 'react';
import { Track } from '@/shared/types/cards';
import Q_Image from '@/components/quarks/Q_Image/Q_image';

const M_Track = ({ name, footer, img, link }: Track) => {
  const [color, setColor] = useState('100 100 100');

  function isTooDarkOrLight(rgb: [number, number, number], { dark = 0.3, light = 0.9 } = {}) {
    const [r, g, b] = rgb;
    const luminance = (0.2 * r + 0.7 * g + 0.1 * b) / 255;
    return luminance < dark || luminance > light;
  }

  function currectBrightness(rgb: [number, number, number], threshold = 0.4) {
    const [r, g, b] = rgb;
    const luminance = (0.2 * r + 0.7 * g + 0.1 * b) / 255;
    if (luminance < threshold) return [r + 55, g + 55, b + 55];
    return rgb;
  }

  type CSSVars = React.CSSProperties & {
    ['--accent-rgb']?: string;
  };

  async function onLoad(e: React.SyntheticEvent<HTMLImageElement>) {
    try {
      const imgEl = e.currentTarget;
      const dominant = (await getColor(imgEl)).array() as [number, number, number];

      if (!isTooDarkOrLight(dominant)) {
        setColor(dominant.join(' '));
        return;
      }

      const swatches = await getSwatches(imgEl);
      const vibrant = swatches.DarkVibrant?.color.array() as [number, number, number] | undefined;

      setColor(currectBrightness(vibrant ?? dominant).join(' '));
    } catch {
      // ignore: keep default color
    }
  }

  return (
    <a href={link} className={classes.track} target="_blank" rel="noopener noreferrer">
      <div className={classes.grad} style={{ ['--accent-rgb']: color } as CSSVars}></div>
      <Q_Image
        crossOrigin="anonymous"
        src={img}
        className={classes.img}
        wrapperClasses={classes.img}
        onLoad={(e) => onLoad(e)}
      />
      <div className={classes.trackinfo}>
        <div>{name}</div>
        <div className={classes.footer1}>{footer}</div>
      </div>
    </a>
  );
};

export default M_Track;
