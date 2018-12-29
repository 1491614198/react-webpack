import { take, fork, call, put } from 'redux-saga/effects'
import { ADD_TODO, DELETE_TODO } from './action'

export function* changeSomething() {
  console.log(1111)
}

export function* addSaga(text) {
  const action = yield take(ADD_TODO)

  yield put({ type: DELETE_TODO, text: 'aaa' })
  yield fork(changeSomething)
  console.log('saga show')
}

export default function* rootSaga() {
  yield fork(addSaga)
}
