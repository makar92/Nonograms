import React from 'react'
import styles from './PageNonogram.module.scss'
import Nonogram from './Nonogram/Nonogram'

const PageNonogram = () => {
  
  return (
    <div className={styles.pageNonogram}>
      <Nonogram />
    </div>
  )
}

export default PageNonogram