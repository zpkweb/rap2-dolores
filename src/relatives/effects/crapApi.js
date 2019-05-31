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

export function * fetchCrapApiModules (action) {
  try {
    let modules, interfaces, detail;
    modules = yield call(CrapApiService.fetchCrapApiModules, action.params)
    if(modules.data && modules.data.length){
      if(!action.params.mod){
        action.params.mod = modules.data[0].id;
      }
      interfaces = yield call(CrapApiService.fetchCrapApiInterfaces, action.params)
      if(!action.params.itf){
        action.params.itf = interfaces.data.length ? interfaces.data[0].id : action.params.itf;
      }
      detail = yield call(CrapApiService.fetchCrapApiDetail, action.params)

      yield put(CrapApiAction.fetchCrapApiModulesSucceeded({modules, interfaces, detail}))
    }else{
      let error = {};
      if(modules.success){
        error = {
          "code": "000010",
          "message": "暂无数据"
        }
      }else{
        error = {
          "code": "000011",
          "message": "验证码已失效，请刷新验证码"
        }
      }
      yield put(CrapApiAction.fetchCrapApiModulesFailed(error))
    }
    
    
  } catch (e) {
    console.error(e.message)
    yield put(CrapApiAction.fetchCrapApiModulesFailed(e.message))
  }
}