import React, { FC, MouseEventHandler } from 'react'
import styles from './Button.module.scss'

interface ButtonProps {
  text: string,
  onClick?: MouseEventHandler,
}

const Button: FC<ButtonProps> = (props) => {
  
  return (
    <div>
      <button onClick={props.onClick} className={styles.button}>{props.text}</button>
    </div>
    
  )
}

export default Button