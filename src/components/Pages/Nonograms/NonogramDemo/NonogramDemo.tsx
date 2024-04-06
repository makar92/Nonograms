import React, { FC, useState } from 'react'
import styles from './NonogramDemo.module.scss'
import InfoCellDemo from './InfoCellDemo/InfoCellDemo'
import { deleteDoc, doc } from 'firebase/firestore'
import { firestore } from '../../../..'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useTypedSelector } from '../../../../hooks/useTepedSelector'
import CellDemo from './CellDemo/CellDemo'
import { calcLeftBlock, calcTopBlock } from '../../../../utils/calcCells'
import { CHOOSE_NONOGRAM } from '../../../../store/reducers/nonogramReduser'
import { useTypeDispatch } from '../../../../hooks/useTypedDispatch'

interface INonogram {
  idx: number,
  row: Array<{idx: number, color: number}>
}

interface NonogramDemoProps {
  nonogram: any
}

const NonogramDemo: FC<NonogramDemoProps> = (props) => {

  const dispatch = useTypeDispatch()
  const navigate = useNavigate()

  const isAdmin = useTypedSelector(state => state.isAdminReducer.isAdmin)

  const [isDeleting, setIsDeleting] = useState(false)
  const [isDelete, setIsDelete] = useState(false)

  const nonogramNumber: string = props.nonogram.data().idx
  const nonogramName: string = props.nonogram.data().name
  const nonogramAddedDate: string = props.nonogram.data().addedDate
  const nonogram: INonogram[] = props.nonogram.data().nonogram
  const nonogramWidth: number = props.nonogram.data().width
  const nonogramHeght: number = props.nonogram.data().heght
  const nonogramNameSize: string = props.nonogram.data().nameSize

  const leftBlock = calcLeftBlock(nonogram)
  const topBlock = calcTopBlock(nonogram)

  async function deleteNonogram() {
    setIsDeleting(true)
    await deleteDoc(doc(firestore, "nonograms", `${props.nonogram.id}`))
    setIsDelete(true)
    console.log(3)
    setIsDeleting(false)
  }

  const openNonogram = (e: any) => {
    dispatch({ type: CHOOSE_NONOGRAM, payload: { nonogram: props.nonogram } })
    navigate('/page_nonogram', { replace: false })
  }

  return (
    <div className={
      isDeleting
        ? styles.deleting
        : !isDelete
          ? styles.nonogram
          : styles.delete
    }
    >
      {isAdmin
        ? <div className={styles.header}>
          <div className={styles.name}>{nonogramName}</div>
          <div className={styles.close} onClick={deleteNonogram}>X</div>
        </div>
        : <></>
      }
      <div className={styles.body} >
        <div className={styles.info}>
          <div className={styles.info__item}>
            <span className={styles.weight}>NUMBER:</span> {nonogramNumber}
          </div>
          <div className={styles.info__item}>
            <span className={styles.weight}>ADDED:</span> {nonogramAddedDate}
          </div>
          <div className={styles.info__item}>
            <span className={styles.weight}>SIZE:</span> {`${nonogramWidth} X ${nonogramHeght} (${nonogramNameSize})`}
          </div>
        </div>
        <div className={styles.field} onClick={openNonogram}>
          <div className={styles.topBlock}>
            {topBlock.map((column) => (
              <div key={column.idx} className={styles.topBlock__column}>
                {column.column.map((infoCell) => (
                  <InfoCellDemo
                    key={infoCell.idx}
                    infoCellDemoNumber={infoCell.value}
                    nonogramWidth={nonogram[0].row.length}
                    nonogramHeght={nonogram.length}
                  />
                ))}
              </div>
            ))}
          </div>
          <div className={styles.leftBlock}>
            {leftBlock.map((row) => (
              <div key={row.idx} className={styles.leftBlock__row}>
                {row.row.map((infoCell) => (
                  <InfoCellDemo
                    key={infoCell.idx}
                    infoCellDemoNumber={infoCell.value}
                    nonogramWidth={nonogram[0].row.length}
                    nonogramHeght={nonogram.length}
                  />
                ))}
              </div>
            ))}
          </div>
          <div className={styles.area}>
            {nonogram.map((row: any) => (
              <div key={row.idx} className={styles.string}>
                {row.row.map((cell: any) => (
                  <CellDemo
                    key={cell.idx}
                    color={cell.color}
                    nonogramWidth={nonogram[0].row.length}
                    nonogramHeght={nonogram.length}
                    x={cell.idx + 1}
                    y={row.idx + 1}
                    xLength={nonogram[0].row.length}
                    yLength={nonogram.length}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default NonogramDemo