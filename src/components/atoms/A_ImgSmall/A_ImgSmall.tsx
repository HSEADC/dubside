import React from 'react';
import classes from '@/components/atoms/A_ImgSmall/A_ImgSmall.module.scss';

type Props = {
  source: string;
  footer: string;
  wrapperClassName?: string;
} & React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>;

const A_ImgSmall = ({ source, footer, wrapperClassName, ...rest }: Props) => {
  return (
    <div className={[classes.imgwrapper, wrapperClassName].filter(Boolean).join(' ')}>
      <img src={source} alt="side-img" {...rest} className={classes.img} />
      <div className={classes.grad}></div>
      <span className={classes.footer}>{footer}</span>
    </div>
  );
};

export default A_ImgSmall;
