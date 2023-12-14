import { produce } from 'immer'
import { GET_ALL_MENU, SET_ALL_MENU } from './constants'

export const initialState = {
  menu: []
}

const homeReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case GET_ALL_MENU:
        break;
      case SET_ALL_MENU:
        draft.menu = action.data
        break;
    }
  })

  export default homeReducer