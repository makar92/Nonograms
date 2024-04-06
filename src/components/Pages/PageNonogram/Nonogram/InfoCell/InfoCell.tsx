import React, { FC } from 'react'
import styles from './InfoCell.module.scss'

interface infoCellProps {
  infoCellNumber: number,
}

const InfoCell:FC<infoCellProps> = ({infoCellNumber}) => {
  return (
    <div className={styles.infoCell}>{infoCellNumber}</div>
  )
}

export default InfoCell