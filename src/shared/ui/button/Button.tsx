import React from "react";
import styles from './Button.module.css';

interface ButtonProps extends  React.ButtonHTMLAttributes<HTMLButtonElement> {
  isDisabled?: boolean,
  variant: 'primary' | 'secondary' | 'tertiary' | 'socialLogin' | 'actionBtn' | 'null'
}

export function Button({ isDisabled, onClick, children, variant, ...restProps }: ButtonProps) {
  return (
    <button disabled={isDisabled} className={`${styles[variant]}`} onClick={onClick} {...restProps}>{children}</button>
  )
}
