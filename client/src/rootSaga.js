import { all } from "redux-saga/effects";
import homeSaga from "./pages/Home/saga";
import createMenuSaga from "./pages/CreateMenu/saga";

export default function* rootSaga() {
  yield all([
    homeSaga(),
    createMenuSaga(),
  ])
}