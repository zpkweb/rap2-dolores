import { call, put } from 'redux-saga/effects'
import * as CrapApiAction from '../../actions/crapApi'
import CrapApiService from '../services/CrapApi'

export function * fetchCrapApiMenu (action) {
  try {
    const count = yield call(CrapApiService.fetchCrapApiMenu, action)
    yield put(CrapApiAction.fetchCrapApiMenuSucceeded(count))
  } catch (e) {
    console.error(e.message)
    yield put(CrapApiAction.fetchCrapApiMenuFailed(e.message))
  }
}