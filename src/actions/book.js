// 获取文档模块
export const fetchBookModules = () => ({ type: 'BOOK_MODULES' })
export const fetchBookModulesSucceeded = (bookModules) => ({ type: 'BOOK_MODULES_SUCCEEDED', bookModules })
export const fetchBookModulesFailed = (error) => ({ type: 'BOOK_MODULES_FAILED', error })

// 获取文档列表
export const fetchBookList = (params) => ({ type: 'BOOK_LIST', params})
export const fetchBookListSucceeded = (bookList) => ({ type: 'BOOK_LIST_SUCCEEDED', bookList })
export const fetchBookListFailed = (error) => ({ type: 'BOOK_LIST_FAILED', error })

// 获取文档详情
export const fetchBookDetail = (params) => ({ type: 'BOOK_DETAIL', params })
export const fetchBookDetailSucceeded = (bookDetail) => ({ type: 'BOOK_DETAIL_SUCCEEDED', bookDetail })
export const fetchBookDetailFailed = (error) => ({ type: 'BOOK_DETAIL_FAILED', error })