import { serve } from './constant'

// 仓库
export default {
  fetchCrapApiMenu () {
    return fetch(`${serve}/crapapi`)
      .then(res => res.json())
      // .then(json => json.data)
  }
}