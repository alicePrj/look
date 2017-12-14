import axios from 'axios'

export const util = {
  getData (src) {
    return axios.get(src)
      .then((res) => {
        return res
      })
      .catch((res) => {
        console.log('error')
        return Promise.reject(res)
      })
  }
}
