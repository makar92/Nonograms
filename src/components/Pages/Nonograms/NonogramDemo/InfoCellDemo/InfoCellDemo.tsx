import React, { FC } from 'react'
import styles from './InfoCellDemo.module.scss'
import { calcSize } from '../../../../../utils/calscSize'

interface infoCellDemoProps {
  infoCellDemoNumber: number,
  nonogramWidth: number,
  nonogramHeght: number
}

const InfoCellDemo: FC<infoCellDemoProps> = ({infoCellDemoNumber, nonogramWidth, nonogramHeght}) => {

  const size = calcSize(nonogramWidth, nonogramHeght)

  return (
    <div className={styles.infoCellDemo} 
    style={{width: size, height: size, fontSize: size - 4}}
    >{infoCellDemoNumber}</div>
  )
}

export default InfoCellDemo