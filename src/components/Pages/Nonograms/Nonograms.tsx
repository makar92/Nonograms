import React, { FC, useEffect, useState } from 'react'
import styles from './Nonograms.module.scss'
import { collection, getDocs } from "firebase/firestore";
import { firestore } from '../../..';
import Loader from '../../UI/Loader/Loader';
import NonogramDemo from './NonogramDemo/NonogramDemo';
import { CHANGE_NONOGRAMS } from '../../../store/reducers/nonogramsReduser';
import { useTypedSelector } from '../../../hooks/useTepedSelector';
import { useTypeDispatch } from '../../../hooks/useTypedDispatch';

const Nonograms: FC = () => {

  const [isloading, setIsLoading] = useState(false)
  const dispatch = useTypeDispatch()
  const nonograms = useTypedSelector((state) => state.nonogramsReducer.nonograms)

  const getData = async () => {

    setIsLoading(true)
    const newNonogram: any = []
    const querySnapshot = await getDocs(collection(firestore, 'nonograms'));
    querySnapshot.forEach((doc) => {
      newNonogram.push(doc)
    })

    //Переделать на серверную сортировку и добавить пагинацию
    newNonogram.sort((a: any, b: any) => a.data().idx > b.data().idx ? 1 : -1);

    dispatch({ type: CHANGE_NONOGRAMS, payload: { nonograms: newNonogram } })
    setIsLoading(false)
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <div className={styles.nonograms}>
      {isloading
        ? <Loader />
        : nonograms.map((q: any) => (<NonogramDemo key={q.id} nonogram={q} />))
      }
    </div>
  )
}

export default Nonograms