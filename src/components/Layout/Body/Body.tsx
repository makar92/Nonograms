import React, { FC } from 'react'
import styles from './Body.module.scss'
import AppRouter from './AppRouter/AppRouter'

const Body: FC = () => {
  
  return (
    <div className={styles.body}>
      <AppRouter/>
    </div>
  )
}

export default Body