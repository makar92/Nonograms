import React from 'react'
import styles from './Loader.module.scss'

const Loader = () => {
  return (
    <div className={styles.loader}>
      <div className={styles.text}>Loading!</div>
      <span className={styles.spiner}></span>
    </div>
  )
}

export default Loader