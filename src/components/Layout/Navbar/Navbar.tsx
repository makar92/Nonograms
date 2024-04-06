import React from 'react'
import styles from './Navbar.module.scss'
import { NavLink } from 'react-router-dom'
import { ADMIN_PANEL_ROUTE, CREATOR_NONOGRAM_ROUTE, NONOGRAMS_ROUTE } from '../../../utils/constRouts'
import { useTypedSelector } from '../../../hooks/useTepedSelector'

const Navbar = () => {

  const isAdmin = useTypedSelector((state) => state.isAdminReducer.isAdmin)
 
  return (
    <nav className={styles.navbar}>
      {isAdmin
        ?
        <ul className={styles.list}>
          <li><NavLink to={ADMIN_PANEL_ROUTE}>Admin panel</NavLink></li>
          <li><NavLink to={NONOGRAMS_ROUTE}>Nonograms</NavLink></li>
          <li><NavLink to={CREATOR_NONOGRAM_ROUTE}>Creator nonogram</NavLink></li>
        </ul >
        :
        <ul className={styles.list}>
          <li><NavLink to={NONOGRAMS_ROUTE}>Nonograms</NavLink></li>
        </ul>
      }
    </nav>
  )
}

export default Navbar