import React from 'react';
import classes from '@/components/molecules/M_Input/M_Input.module.scss';

type Props = {
  placeholder: string;
} & React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

const M_Input = ({ placeholder, ...data }: Props) => {
  return (
    <div className={classes.inputwrapp}>
      <input type="text" className={classes.input} placeholder={placeholder} {...data} />
    </div>
  );
};

export default M_Input;
