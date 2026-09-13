import type { InputHTMLAttributes } from 'react';

import styles from './Input.module.css';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  error?: boolean;
};

export const Input = ({ className, error, ...props }: InputProps) => {
  return (
    <input
      className={[styles.input, error && styles.inputError, className]
        .filter(Boolean)
        .join(' ')}
      {...props}
    />
  );
};
