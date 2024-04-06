export const CHOOSE_NONOGRAM = "CHOOSE_NONOGRAM"

interface INonogram {
  idx: number,
  row: Array<{idx: number, color: number}>
}

interface Action {type: string, payload?: any}
interface NonogramState {name: string, nonogram: INonogram[]}

const initialState: NonogramState = {
  name: sessionStorage.nonogramName || "",
  nonogram: JSON.parse( sessionStorage.nonogram || false) || [
    { idx: 0, row: [{ idx: 0, color: 0 }] },
  ],
}

export const nonogramReducer = (state = initialState, action: Action): NonogramState => {
  switch (action.type) {
    case CHOOSE_NONOGRAM:
      sessionStorage.nonogramName = action.payload.nonogram.data().name
      sessionStorage.nonogram = JSON.stringify(action.payload.nonogram.data().nonogram);
      return { ...state, nonogram: action.payload.nonogram.data().nonogram, name: action.payload.nonogram.data().name}
    default:
      return state
  } 
}