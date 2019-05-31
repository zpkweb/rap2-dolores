import { serve } from './constant'

// 仓库
export default {
  fetchCrapApiMenu () {
    return fetch(`${serve}/crapapi`)
      .then(res => res.json())
      // .then(json => json.data)
  },
  fetchCrapApiModules ({
    modulesId = '',
    password = '',
    code = '',
    current = ''
  } = {}) {
    return fetch(`${serve}/crapapi/modules?moduleId=${modulesId}&password=${password}&code=${code}&current=${current}`)
      .then(res => res.json())
      // .then(json => json.data)
  },
  fetchCrapApiInterfaces ({
    mod = '',
    password = '',
    code = '',
    current = ''
  } = {}) {
    return fetch(`${serve}/crapapi/interfaces?moduleId=${mod}&password=${password}&code=${code}&current=${current}`)
      .then(res => res.json())
      // .then(json => json.data)
  },
  fetchCrapApiDetail ({
    itf = '',
    password = '',
    code = ''
  } = {}) {
    return fetch(`${serve}/crapapi/detail?id=${itf}&password=${password}&code=${code}`)
      .then(res => res.json())
      // .then(json => json.data)
  }
}