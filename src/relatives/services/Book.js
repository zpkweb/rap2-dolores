import { serve } from './constant'

export default {
  // 获取文档模块
  fetchBookModules ({
    tid = 'WELCOME',
    password = '',
    visitCode = ''
  } = {}) {
    return fetch(`${serve}/book/modules?type=${tid}&password=${password}&visitCode=${visitCode}`)
      .then(res => res.json())
    // .then(json => json.data)
  },
  // 获取文档列表
  fetchBookList ({
    tid = 'ARTICLE',
    category = '',
    visitCode = ''
  } = {}) {
    return fetch(`${serve}/book/list?type=${tid}&category=${category}&visitCode=${visitCode}`)
      .then(res => res.json())
    // .then(json => json.data)
  },
  // 获取文档详情
  fetchBookDetail ({
    id = ''
  } = {}) {
    return fetch(`${serve}/book/detail?id=${id}`)
      .then(res => res.json())
    // .then(json => json.data)
  },
}
