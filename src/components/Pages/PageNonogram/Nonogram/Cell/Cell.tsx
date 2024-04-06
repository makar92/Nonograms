import React, { FC, MouseEventHandler, useEffect, useState } from 'react'
import styles from './Cell.module.scss'

interface CellProps {
  isCross?: boolean,
  color: number;
  onClick?: MouseEventHandler,
  onMouseEnter?: MouseEventHandler,
  onMouseDown?: MouseEventHandler,
  changeIsCross?: any,
  x: number,
  y: number,
  xLength?: number,
  yLength?: number,
  isWin: boolean,
}

const Cell:FC<CellProps> = ({isWin, x, y, xLength, yLength, color, ...props }) => {

  const [isCross, setIsCross] = useState(false)  
  const [className, setClassName] = useState(styles.cell)

  const changeIsCross = () => {
    if (isCross) {
      setIsCross(false)
    } else {
      props.changeIsCross()
      setIsCross(true)
    }
  }

  useEffect(() => {
    if (color === 1) {
      setIsCross(false)
    }
  }, [color])

  useEffect(() => {
    if (isWin) {
      setIsCross(false)
    }
  }, [isWin])

  useEffect(() => {

    let crossClass = ""
    let colorClass = ""
    let multipleFiveWithClass = ""
    let multipleFiveHeghtClass = ""

    if (isCross) crossClass = styles.cell_cross
    if (color === 1) colorClass = styles.cell_black
    if (color === 0) colorClass = styles.cell_white
    if (x % 5 === 0 && xLength !== x) multipleFiveWithClass = styles.cell_multipleFiveWidth
    if (y % 5 === 0 && yLength !== y) multipleFiveHeghtClass = styles.cell_multipleFiveHeght
    
    setClassName(
      styles.cell + " " + 
      crossClass + " " + 
      colorClass + " " + 
      multipleFiveWithClass + " " + 
      multipleFiveHeghtClass
    )

  }, [color, xLength, yLength, isCross])

  return (
    <div className={className}
      onClick={props.onClick}
      onMouseEnter={props.onMouseEnter}
      onMouseDown={props.onMouseDown}
      onContextMenu={changeIsCross}
    ></div>
  )
}

export default Cell