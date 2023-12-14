import { put, takeLatest, call} from 'redux-saga/effects'
import toast from 'react-hot-toast';
import { GET_ALL_MENU } from './constants'
import { getAllMenu } from '../../domain/api'
import { setAllMenu } from './actions'

export function* doGetAllMenu() {
  try {
    const response = yield call(getAllMenu)
    yield put(setAllMenu(response))
  } catch (err) {
    toast.error(err.response.data.message);
  }
}

export default function* homeSaga() {
  yield takeLatest(GET_ALL_MENU, doGetAllMenu)
}