interface nonogram {
  [index: number]: {
    idx: number,
    row: {
      [index: number]: {
        idx: number,
        color: number
      }
      length: number
    }
  },
  length: number
  map: any
}



export const calcLeftBlock = (nonogram: nonogram) => {
  
  const leftBlock = []

  for (let j = 0; j < nonogram.length; j++) {

    let rowLeftBlock = []
    let acum = 0

    for (let i = 0; i < nonogram[0].row.length; i++) {
      if (nonogram[j].row[i].color === 1) {
        ++acum
        if (i !== nonogram[j].row.length - 1) {
          if (nonogram[j].row[i + 1].color === 0) {
            rowLeftBlock.push({ idx: i, value: acum })
            acum = 0
          }
        } else {
          rowLeftBlock.push({ idx: i, value: acum })
          acum = 0
        }
      }
    }

    if (rowLeftBlock.length === 0) {
      leftBlock.push({ idx: j, row: [{ idx: 0, value: acum }] })
    } else {
      leftBlock.push({ idx: j, row: rowLeftBlock })
    }
  }

  return leftBlock
}

export const calcTopBlock = (nonogram: nonogram) => {
  const topBlock = []

  for (let j = 0; j < nonogram[0].row.length; j++) {

    let columnTopBlock = []
    let acum = 0

    for (let i = 0; i < nonogram.length; i++) {
      if (nonogram[i].row[j].color === 1) {
        ++acum
        if (i !== nonogram.length - 1) {
          if (nonogram[i + 1].row[j].color === 0) {
            columnTopBlock.push({ idx: i, value: acum })
            acum = 0
          }
        } else {
          columnTopBlock.push({ idx: i, value: acum })
          acum = 0
        }
      }
    }

    if (columnTopBlock.length === 0) {
      topBlock.push({ idx: j, column: [{ idx: 0, value: acum }] })
    } else {
      topBlock.push({ idx: j, column: columnTopBlock })
    }
  }

  return topBlock
}

export const buildField = (nonogram: nonogram) => {

  const nongramHaight = nonogram.length
  const nongramWidth = nonogram[0].row.length

  const field = []

  for (let j = 0; j < nongramHaight; j++) {
    let row = []
    for (let i = 0; i < nongramWidth; i++) {
      row.push({ idx: i, color: 0 })
    }
    field.push({ idx: j, row: row })
  }

  return field
}