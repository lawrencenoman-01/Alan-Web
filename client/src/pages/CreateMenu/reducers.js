import { produce } from 'immer'
import { CREATE_MENU } from './constants'

export const initialState = {
  menu: []
}

const createMenuReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case CREATE_MENU:
        break;
    }
  })

  export default createMenuReducer