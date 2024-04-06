export const IN_ADMIN = "IN_ADMIN"
export const OUT_ADMIN = "OUT_ADMIN"

interface Action {type: string, payload?: any}
interface IsAdminState { isAdmin: boolean | undefined}

const initialState: IsAdminState = {
  isAdmin: JSON.parse(localStorage.isAdmin || false) || false
}



export const isAdminReducer = (state = initialState, action: Action): IsAdminState => {
  switch (action.type) {
    case IN_ADMIN:
      localStorage.isAdmin = JSON.stringify(true)
      return { ...state, isAdmin: true }
    case OUT_ADMIN:
      localStorage.isAdmin = JSON.stringify(false)
      return { ...state, isAdmin: false }
    default:
      return state
  } 
}