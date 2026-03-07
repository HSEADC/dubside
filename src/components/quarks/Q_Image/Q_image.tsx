import React, { forwardRef, useEffect, useState } from 'react';
import classes from '@/components/quarks/Q_Image/Q_image.module.scss';

type Props = {
  wrapperClasses?: string;
} & React.ImgHTMLAttributes<HTMLImageElement>;

const Q_Image = forwardRef<HTMLImageElement, Props>(function Q_Image(
  { src, wrapperClasses, className, onLoad, onError, loading = 'lazy', decoding = 'async', ...rest },
  ref
) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(false);
  }, [src]);

  const imgCls = `${classes.img}${className ? ` ${className}` : ''}`;
  const wrapperCls = `${classes.wrapper}${wrapperClasses ? ` ${wrapperClasses}` : ''}`;

  return (
    <span className={wrapperCls} data-loaded={loaded ? '1' : undefined}>
      <img
        {...rest}
        ref={ref}
        src={src}
        className={imgCls}
        loading={loading}
        decoding={decoding}
        onLoad={(e) => {
          setLoaded(true);
          onLoad?.(e);
        }}
        onError={(e) => {
          setLoaded(false);
          onError?.(e);
        }}
      />
    </span>
  );
});

export default Q_Image;
