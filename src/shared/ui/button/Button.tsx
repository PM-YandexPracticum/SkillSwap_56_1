import React from "react";
import styles from './Button.module.css';
export { styles as buttonStyles };

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string,
  icon?: React.ReactNode,
}

export function Button({ className, style, text, icon, ...props }: ButtonProps) {
  return (
    <button className={className} style={style} {...props}>
      {icon}{text}
    </button>
  )
}
