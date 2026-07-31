import React from 'react';
import classes from '@/components/atoms/A_ImgLarge/A_ImgLarge.module.scss';

type Props = {
  source: string;
  footer: string;
} & React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>;

const A_ImgLarge = ({ source, footer, loading = 'lazy', decoding = 'async', ...rest }: Props) => {
  return (
    <div className={classes.imgwrapper}>
      <img
        className={classes.img}
        src={source}
        alt="large-img"
        loading={loading}
        decoding={decoding}
        {...rest}
      />
      <div className={classes.grad}></div>
      <span className={classes.footer}>{footer}</span>
    </div>
  );
};

export default A_ImgLarge;
