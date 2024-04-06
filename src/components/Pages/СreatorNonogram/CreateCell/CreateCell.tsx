import React, { FC, MouseEventHandler, useEffect, useState } from 'react'
import styles from './CreateCell.module.scss'
import { useDispatch } from 'react-redux';


interface ICreateCell {
  color: number;
  onClick?: MouseEventHandler,
  onMouseEnter?: MouseEventHandler,
  onMouseDown?: MouseEventHandler,
  changeIsCross?: any,
  x: number,
  y: number,
  xLength?: number,
  yLength?: number,
}

const CreateCell: FC<ICreateCell> = ({x, y, xLength, yLength, color, ...props }) => {

  const [className, setClassName] = useState(styles.cell)

  useEffect(() => {

    let colorClass = ""
    let multipleFiveWithClass = ""
    let multipleFiveHeghtClass = ""

    if (color === 1) colorClass = styles.cell_black
    if (color === 0) colorClass = styles.cell_white
    if (x % 5 === 0 && xLength !== x) multipleFiveWithClass = styles.cell_multipleFiveWidth
    if (y % 5 === 0 && yLength !== y) multipleFiveHeghtClass = styles.cell_multipleFiveHeght
    
    setClassName(
      styles.cell + " " + 
      colorClass + " " + 
      multipleFiveWithClass + " " + 
      multipleFiveHeghtClass
    )

  }, [color, xLength, yLength])

  return (
    <div className={className}
      onClick={props.onClick}
      onMouseEnter={props.onMouseEnter}
      onMouseDown={props.onMouseDown}
    ></div>
  )
}

export default CreateCell