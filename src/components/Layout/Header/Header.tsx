import React, { FC } from 'react'
import styles from './Header.module.scss'
import Button from '../../UI/Button/Button'
import { useTypedSelector } from '../../../hooks/useTepedSelector'
import { IN_ADMIN, OUT_ADMIN } from '../../../store/reducers/isAdminReduser'
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { adminEmail, auth } from '../../..'
import { useTypeDispatch } from '../../../hooks/useTypedDispatch'

const Header: FC = () => {

  const dispatch = useTypeDispatch()
  const isAdmin = useTypedSelector((state) => state.isAdminReducer.isAdmin)

  const loginAdmin = async () => {
    const provider = new GoogleAuthProvider()
    const user = await signInWithPopup(auth, provider)
    if (user.user.email === adminEmail) {
      dispatch({type: IN_ADMIN})
      alert("Добро пожаловать в панель администратора!")
    } else {
      auth.signOut()
      alert("Вы не являетесь администратором данного сайта!")
    }
  }

  const outAdmin = () => {
    auth.signOut()
    dispatch({type: OUT_ADMIN})
  }

  return (
    <div className={styles.header}>
      <div className={styles.logo}>
        NONOGRAMS
      </div>
      <div className={styles.account}>
        {isAdmin
          ? <Button text='outAdmin' onClick={() => {outAdmin()}}/>
          : <Button text='inAdmin' onClick={() => {loginAdmin()}}/>
        }
      </div>
    </div>
  )
}

export default Header