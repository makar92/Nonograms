import React, { FC } from 'react'
import styles from './CellDemo.module.scss'
import { useTypedSelector } from '../../../../../hooks/useTepedSelector'
import { calcSize } from '../../../../../utils/calscSize'

interface ICellDemo {
  color: number,
  nonogramWidth: number,
  nonogramHeght: number,
  x: number,
  y: number,
  xLength?: number,
  yLength?: number,
}

const CellDemo: FC<ICellDemo> = ({x, y, xLength, yLength, color, nonogramWidth, nonogramHeght}) => {

  const isAdmin = useTypedSelector(state => state.isAdminReducer.isAdmin)

  let classColor
  if (color === 0) classColor = styles.cell_white
  if (color === 1) classColor = styles.cell_black
  if (isAdmin === false) classColor = ""

  let multipleFiveWithClass = ""
  let multipleFiveHeghtClass = ""
  if (x % 5 === 0 && xLength !== x) multipleFiveWithClass = styles.cell_multipleFiveWidth
  if (y % 5 === 0 && yLength !== y) multipleFiveHeghtClass = styles.cell_multipleFiveHeght
  
  let size = `${calcSize(nonogramWidth, nonogramHeght)}px`

  return (
    <div 
      className={styles.cell + " " + classColor + " " + multipleFiveWithClass + " " + multipleFiveHeghtClass}
      style={{width: size, height: size}}
    ></div>
  )
}

export default CellDemo