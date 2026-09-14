import React from "react";
import styles from './Button.module.css';
export { styles as buttonStyles };

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string,
  icon?: React.ReactNode,
  isDisabled?: boolean
}

export function Button({ isDisabled, className, style, text, icon, ...props }: ButtonProps) {
  return (
    <button disabled={isDisabled} className={className} style={style} {...props}>
      {icon}{text}
    </button>
  )
}
