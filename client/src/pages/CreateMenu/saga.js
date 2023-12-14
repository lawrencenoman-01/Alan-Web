/* eslint-disable no-unused-vars */
import { put, takeLatest, call } from 'redux-saga/effects'
import Swal from 'sweetalert2';
import { CREATE_MENU } from './constants'
import { createMenu } from '../../domain/api'

const createMenuSuccess = (message) =>
  Swal.fire({
    icon: 'success',
    title: 'Success',
    text: message,
  });

const emptyData = (message) =>
  Swal.fire({
    icon: 'error',
    title: 'Failed to Add Product',
    text: message,
  });

export function* doCreateMenu({ menu }) {
  try {
    yield call(createMenu, menu)
    yield call(createMenuSuccess, 'Successfully Create Menu');
    window.location.href = '/';
  } catch (err) {
    const message = err.response.data.message;
    yield call(emptyData, `${message}`);
  }
}

export default function* createMenuSaga() {
  yield takeLatest(CREATE_MENU, doCreateMenu)
}