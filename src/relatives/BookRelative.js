import { call, put } from 'redux-saga/effects'
import * as BookAction from '../actions/book'
import BookService from './services/Book'

export default {
  reducers: {
    bookModules (state = { data: {brief:'',content:'',categorys:[]} }, action) {
      switch (action.type) {
        case BookAction.fetchBookModulesSucceeded().type:
          return { data: action.bookModules.data }
        default:
          return state
      }
    },
    bookList (state = { data: [], others: {category:"", categorys: []}, page: {} }, action) {
      switch (action.type) {
        case BookAction.fetchBookListSucceeded().type:
          return action.bookList
        default:
          return state
      }
    },
    bookDetail (state = { data: {detail:{},categorys:[]} }, action) {
      switch (action.type) {
        case BookAction.fetchBookDetailSucceeded().type:
          return { data: action.bookDetail.data }
        default:
          return state
      }
    }
  },
  sagas: {
    * [BookAction.fetchBookModules().type] (action) {
      try {
        const users = yield call(BookService.fetchBookModules, action)
        yield put(BookAction.fetchBookModulesSucceeded(users))
      } catch (e) {
        yield put(BookAction.fetchBookModulesFailed(e.message))
      }
    },
    * [BookAction.fetchBookList().type] (action) {
      try {
        const list = yield call(BookService.fetchBookList, action.params)
        yield put(BookAction.fetchBookListSucceeded(list))
      } catch (e) {
        console.log(3333,e)
        yield put(BookAction.fetchBookListFailed(e.message))
      }
    },
    * [BookAction.fetchBookDetail().type] (action) {
      const {
        id
      } = action.params
      try {
        const detail = yield call(BookService.fetchBookDetail, {id})
        yield put(BookAction.fetchBookDetailSucceeded(detail))
      } catch (e) {
        yield put(BookAction.fetchBookDetailFailed(e.message))
      }
    }
  },
  listeners: {
    '/book': [BookAction.fetchBookModules],
    '/book/list': [BookAction.fetchBookList],
    '/book/detail': [BookAction.fetchBookDetail],
  }
}
