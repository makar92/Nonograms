import React, { useEffect, useState } from 'react'
import styles from './Nonogram.module.scss'
import Cell from './Cell/Cell'
import InfoCell from './InfoCell/InfoCell'
import { useTypedSelector } from '../../../../hooks/useTepedSelector'
import { buildField, calcLeftBlock, calcTopBlock } from '../../../../utils/calcCells'

const Nonogram = () => {

  const nonogram = useTypedSelector(state => state.nonogramReducer.nonogram)
  const nonogramName = useTypedSelector(state => state.nonogramReducer.name)

  const [field, setField] = useState([{ idx: 0, row: [{ idx: 0, color: 0 }] },])
  const [startColor, setStartColor] = useState(0)
  const [isMouseDown, setIsMouseDown] = useState(false)
  const [isWin, setIsWin] = useState(false)

  const nongramHaight = nonogram.length
  const nongramWidth = nonogram[0].row.length

  const leftBlock = calcLeftBlock(nonogram)
  const topBlock = calcTopBlock(nonogram)

  useEffect(() => {
    setField(buildField(nonogram))
  }, [])

  const addSelectedCellFirst = (e: any, row: number, cell: number) => {
    e.preventDefault()

    if (e.button === 0) {
      let copyNewNonogram = field.slice(0, field.length)
      if (copyNewNonogram[row].row[cell].color === 1) {
        setStartColor(1)
        copyNewNonogram[row].row[cell].color = 0
      }
      else if (copyNewNonogram[row].row[cell].color === 0) {
        setStartColor(0)
        copyNewNonogram[row].row[cell].color = 1
      }
      setField(copyNewNonogram)
    }
  }

  const addSelectedCell = (e: any, row: number, cell: number) => {
    e.preventDefault()
    if (isMouseDown) {
      let copyNewNonogram = field.slice(0, field.length)
      if (startColor === 1) {
        copyNewNonogram[row].row[cell].color = 0
      } else if (startColor === 0) {
        copyNewNonogram[row].row[cell].color = 1
      }
      setField(copyNewNonogram)
    }
  }

  const addMarkerCross = (row: number, cell: number) => {
    let copyNewNonogram = field.slice(0, field.length)
    copyNewNonogram[row].row[cell].color = 0
    setField(copyNewNonogram)
  }

  useEffect(() => {

    const arr1: any = []
    field.forEach((r: any) => {
      let row: number[] = []
      r.row.forEach((q: any) => row.push(q.color))
      arr1.push(row)
    })

    const arr2: any = []
    nonogram.forEach((r: any) => {
      let row: number[] = []
      r.row.forEach((q: any) => row.push(q.color))
      arr2.push(row)
    })

    if ((JSON.stringify(arr1) === JSON.stringify(arr2)) && nonogram.length > 4) {
      setIsWin(true)
      setTimeout(() => {
        alert(`You win!!! "${nonogramName}"`)
        setIsWin(false)
        setField(buildField(nonogram))
      }, 500)
      
    }
  }, [field])

  return (
    <div className={styles.nonogram} onContextMenu={(event: any) => { event.preventDefault() }}>
      <div className={styles.topBlock}>
        {topBlock.map((column) => (
          <div key={column.idx} className={styles.topBlock__column}>
            {column.column.map((infoCell) => (
              <InfoCell key={infoCell.idx} infoCellNumber={infoCell.value} />
            ))}
          </div>
        ))}
      </div>
      <div className={styles.leftBlock}>
        {leftBlock.map((row) => (
          <div key={row.idx} className={styles.leftBlock__row}>
            {row.row.map((infoCell) => (
              <InfoCell key={infoCell.idx} infoCellNumber={infoCell.value} />
            ))}
          </div>
        ))}
      </div>
      <div className={styles.area} 
        onMouseDown={(e) => {if (e.button === 0) setIsMouseDown(true)}}
        onMouseUp={() => {setIsMouseDown(false)}}
        onMouseLeave={() => {setIsMouseDown(false)}}
      >
        {field.map((row) => (
          <div key={row.idx} className={styles.string}>
            {row.row.map((cell) => (
              <Cell 
                key={cell.idx} 
                color={cell.color} 
                onMouseEnter={(e) => { addSelectedCell(e, row.idx, cell.idx) }}
                onMouseDown={(e) => { addSelectedCellFirst(e, row.idx, cell.idx) }}
                changeIsCross={() => {addMarkerCross(row.idx, cell.idx)}}
                x={cell.idx + 1}
                y={row.idx + 1}
                xLength={field[0].row.length}
                yLength={field.length}
                isWin={isWin}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Nonogram