import React from 'react';
import classes from '@/components/atoms/A_ImgLarge/A_ImgLarge.module.scss';

type Props = {
  source: string;
  footer: string;
} & React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>;

const A_ImgLarge = ({ source, footer, ...rest }: Props) => {
  return (
    <div className={classes.imgwrapper}>
      <img className={classes.img} src={source} alt="large-img" {...rest} />
      <div className={classes.grad}></div>
      <span className={classes.footer}>{footer}</span>
    </div>
  );
};

export default A_ImgLarge;
