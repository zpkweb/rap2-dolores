// 获取crapapi菜单
export const fetchCrapApiMenu = (crapApi) => ({ type: 'CRAPAPI_MENU', crapApi })
export const fetchCrapApiMenuSucceeded = (crapApiMenu) => ({ type: 'CRAPAPI_MENU_SUCCEEDED', crapApiMenu })
export const fetchCrapApiMenuFailed = (error) => ({ type: 'CRAPAPI_MENU_FAILED', error })

// 获取crapapi模块
export const fetchCrapApiModules = () => ({ type: 'CRAPAPI_MODULES' })
export const fetchCrapApiModulesSucceeded = (CrapApiModules) => ({ type: 'CRAPAPI_MODULES_SUCCEEDED', CrapApiModules })
export const fetchCrapApiModulesFailed = (error) => ({ type: 'CRAPAPI_MODULES_FAILED', error })

// 获取crapapi列表
export const fetchCrapApiList = (params) => ({ type: 'CRAPAPI_LIST', params})
export const fetchCrapApiListSucceeded = (CrapApiList) => ({ type: 'CRAPAPI_LIST_SUCCEEDED', CrapApiList })
export const fetchCrapApiListFailed = (error) => ({ type: 'CRAPAPI_LIST_FAILED', error })

// 获取crapapi详情
export const fetchCrapApiDetail = (params) => ({ type: 'CRAPAPI_DETAIL', params })
export const fetchCrapApiDetailSucceeded = (CrapApiDetail) => ({ type: 'CRAPAPI_DETAIL_SUCCEEDED', CrapApiDetail })
export const fetchCrapApiDetailFailed = (error) => ({ type: 'CRAPAPI_DETAIL_FAILED', error })