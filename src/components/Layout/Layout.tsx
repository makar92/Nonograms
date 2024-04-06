import React, { FC } from 'react'
import styles from './Layout.module.scss'
import Navbar from './Navbar/Navbar'
import Header from './Header/Header'
import Body from './Body/Body'

const Layout: FC = () => {

  return (
    <div className={styles.layout}>
      <Header/>
      <Navbar/>
      <Body/>
    </div>
  )
}

export default Layout