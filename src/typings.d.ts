declare module '*.module.scss' {
  interface IClassNames {
    [className: string]: string;
  }
  const classNames: IClassNames;
  export = classNames;
}

declare module '*.png';
declare module '*.jpeg';
declare module '*.jpg';
declare module '*.gif';
declare module '*.mp4';
declare module '*.svg' {
  import React from 'react';
  const SVG: React.FC<React.SVGProps<SVGSVGElement>>;
  export default SVG;
}

declare const __PLATFORM__: 'desktop' | 'mobile';
