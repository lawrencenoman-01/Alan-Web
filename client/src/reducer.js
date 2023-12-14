import { combineReducers } from "redux";
import homeReducer from './pages/Home/reducers'
import createMenuReducer from "./pages/CreateMenu/reducers";

const rootReducer = combineReducers({
  homeReducer: homeReducer,
  createMenuReducer: createMenuReducer,
})

export default rootReducer