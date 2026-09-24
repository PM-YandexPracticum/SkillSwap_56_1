import React from 'react';
import styles from './Button.module.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'tertiary' | 'socialLogin' | 'actionBtn'
}

export function Button({children, variant, className, ...restProps }: ButtonProps) {
  return (
    <button className={[variant ? styles[variant] : undefined, className].filter(Boolean).join(' ')} {...restProps}>{children}</button>
  )
}
