import React from "react";
import styles from './Button.module.css';
export { styles as buttonStyles };

interface ButtonProps extends  React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string,
  icon?: React.ReactNode,
  isDisabled?: boolean
}

export function Button({ isDisabled, className, style, text, icon, onClick, type }: ButtonProps) {
  return (
    <button type={type} disabled={isDisabled} className={className} style={style} onClick={onClick}>{icon}{text}</button>
  )
}