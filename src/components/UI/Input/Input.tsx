import React, { FC, ReactEventHandler } from 'react'
import styles from './Input.module.scss'

interface IInput {
  undertext?: string,
  type: "text" | "number",
  placeholder?: string,
  value?: any,
  onChange?: ReactEventHandler
  min?: number,
  max?: number,
  required?: any
}

const Input: FC<IInput> = ({ ...props }) => {
  return (
    <div className={styles.inputBlock}>
      <div className={styles.undertext}>{props.undertext}</div>
      <input className={styles.input}
        placeholder={props.placeholder}
        min={props.min}
        max={props.max}
        {...props}
      />
    </div>
  )
}

export default Input