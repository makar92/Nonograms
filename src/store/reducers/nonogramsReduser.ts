export const CHANGE_NONOGRAMS = "CHANGE_NONOGRAMS"

interface Action {type: string, payload?: any}
interface NonogramsState { nonograms: any}

const initialState: NonogramsState = {
  nonograms: [],
}

export const nonogramsReducer = (state = initialState, action: Action): NonogramsState => {
  switch (action.type) {
    case CHANGE_NONOGRAMS:
      return { ...state, nonograms: action.payload.nonograms}
    default:
      return state
  } 
}