import React, {  useEffect, useState } from 'react'
import styles from './СreatorNonogram.module.scss'
import { addDoc, collection, getDocs } from 'firebase/firestore'
import { firestore } from '../../..'
import Input from '../../UI/Input/Input'
import Button from '../../UI/Button/Button'
import CreateCell from './CreateCell/CreateCell'

const СreatorNonogram = () => {

  const [nameNonogramm, setNameNonogram] = useState("")
  const [widthNonogram, setWidthNonogram] = useState(5)
  const [heghtNonogram, setHeghtNonogram] = useState(5)
  const [nameSizeNonogram, setNameSizeNonogram] = useState("small")
  const [newNonogram, setNewNonogram] = useState([
    { idx: 0, row: [{ idx: 0, color: 0 }] },
  ])
  const [startColor, setStartColor] = useState(0)
  const [isMouseDown, setIsMouseDown] = useState(false)

  const addSelectedCellFirst = (e: any, row: number, cell: number) => {
    e.preventDefault()
    if (e.button == 0) {
      let copyNewNonogram = newNonogram.slice(0, newNonogram.length)
      if (copyNewNonogram[row].row[cell].color === 1) {
        setStartColor(1)
        copyNewNonogram[row].row[cell].color = 0
      }
      else if (copyNewNonogram[row].row[cell].color === 0) {
        setStartColor(0)
        copyNewNonogram[row].row[cell].color = 1
      }
      setNewNonogram(copyNewNonogram)
    }
  }

  const addSelectedCell = (e: any, row: number, cell: number) => {
    e.preventDefault()
    if (isMouseDown) {
      let copyNewNonogram = newNonogram.slice(0, newNonogram.length)
      if (startColor === 1) {
        copyNewNonogram[row].row[cell].color = 0
      } else if (startColor === 0) {
        copyNewNonogram[row].row[cell].color = 1
      }
      setNewNonogram(copyNewNonogram)
    }
  }

  const createNonogram = async (e: any) => {
    e.preventDefault()

    //Получаем массив индексов всех нонограмов
    let index: number
    const indexes: number[] = []
    const querySnapshot = await getDocs(collection(firestore, 'nonograms'));
    if (querySnapshot !== undefined) {
      querySnapshot.forEach((doc) => {
        indexes.push(doc.data().idx)
      })
    }
   
    //Создаем индекс для нового нонограма
    if (indexes.length === 0) index = 0
    else index = Math.max.apply(null, indexes) + 1

    //Создаем дату создания
    let addedMonth = new Date().toISOString().substr(5, 2)
    let addedDay = Date().substr(8, 2)
    let addedYear = new Date().getFullYear()
    let addedDate = `${addedMonth}.${addedDay}.${addedYear}`

    //Отправляем новый нонограм на сервер
    try {
      const docRef = await addDoc(collection(firestore, "nonograms"), {
        idx: index,
        addedDate: addedDate,
        name: nameNonogramm,
        width: widthNonogram,
        heght: heghtNonogram,
        nameSize: nameSizeNonogram,
        nonogram: newNonogram
      })
      alert(`Nonogram created with ID: ${docRef.id}`)
      console.log("Document written with ID: ", docRef.id);
      setWidthNonogram(0)
      setHeghtNonogram(0)
      setTimeout(() => {
        setNameNonogram("")
        setWidthNonogram(5)
        setHeghtNonogram(5)
      }, 10)
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  useEffect(() => {
    let sizeNonogram = []
    for (let j = 0; j < heghtNonogram; j++) {
      let row = []
      for (let i = 0; i < widthNonogram; i++) {
        row.push({ idx: i, color: 0 })
      }
      sizeNonogram.push({ idx: j, row: row })
    }
    setNewNonogram(sizeNonogram)

    if (widthNonogram >= 60 || heghtNonogram >= 60) setNameSizeNonogram("huge")
    else if (widthNonogram >= 40 || heghtNonogram >= 40) setNameSizeNonogram("big")
    else if (widthNonogram >= 20 || heghtNonogram >= 20) setNameSizeNonogram("middle")
    else setNameSizeNonogram("small")

  }, [widthNonogram, heghtNonogram])

  return (
    <form className={styles.creatorNonogram}
      onSubmit={createNonogram}
    >
      <Input 
        type='text' 
        undertext='Name nonogram:' 
        placeholder='name nonogram' 
        value={nameNonogramm}
        onChange={(e: any) => setNameNonogram(e.target.value) }
        required
      />
      <Input
        type='number'
        undertext='Width:'
        value={widthNonogram}
        min={5}
        max={20}
        onChange={(e: any) => setWidthNonogram(e.target.value) }
      />
      <Input
        type='number'
        undertext='Heght:'
        value={heghtNonogram}
        min={5}
        max={20}
        onChange={(e: any) => { setHeghtNonogram(e.target.value) }}
      />
      <div className={styles.cells}
        onMouseDown={(e) => { if (e.button === 0) setIsMouseDown(true) }}
        onMouseUp={() => { setIsMouseDown(false) }}
        onMouseLeave={() => { setIsMouseDown(false) }}
        onContextMenu={(e) => { e.preventDefault() }}
      >
        {newNonogram.map((row) => (
          <div key={row.idx} className={styles.row}>
            {row.row.map((cell) => (
              <CreateCell
                key={cell.idx}
                color={cell.color}
                onMouseEnter={(e) => { addSelectedCell(e, row.idx, cell.idx) }}
                onMouseDown={(e) => { addSelectedCellFirst(e, row.idx, cell.idx) }}
                x={cell.idx + 1}
                y={row.idx + 1}
                xLength={newNonogram[0].row.length}
                yLength={newNonogram.length}
              />
            ))}
          </div>
        ))}
      </div>
      <Button text='Create' />
    </form>
  )
}

export default СreatorNonogram